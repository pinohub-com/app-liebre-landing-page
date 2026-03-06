"""
API para convertir videos WebM a MP4 (flujo asíncrono con SQS).

- POST /upload-url: Retorna URL firmada para subir el WebM a S3
- POST /convert: Encola la conversión en SQS, retorna { key, status: "queued" }
- GET /status?key=...: Indica si el MP4 está listo; si sí, retorna downloadUrl

La Lambda videoConverter (trigger SQS) hace la conversión con timeout 900s.
"""

import json
import os
import subprocess
import uuid

import boto3
from botocore.exceptions import ClientError

BUCKET = os.environ.get("BUCKET_NAME")
QUEUE_URL = os.environ.get("QUEUE_URL")
FFMPEG_PATH = "/opt/bin/ffmpeg"
PRESIGN_EXPIRATION = 3600  # 1 hora


def _json_response(body: dict, status: int = 200) -> dict:
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(body),
    }


def _error(message: str, status: int = 400) -> dict:
    return _json_response({"error": message}, status)


def get_upload_url(event: dict, context) -> dict:
    """Retorna URL firmada para subir el video WebM a S3."""
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        body = {}

    filename = body.get("filename", "video.webm")
    if not filename.lower().endswith(".webm"):
        filename = filename.rsplit(".", 1)[0] + ".webm"

    key = f"uploads/{uuid.uuid4().hex}/{filename}"
    s3 = boto3.client("s3")

    try:
        url = s3.generate_presigned_url(
            "put_object",
            Params={"Bucket": BUCKET, "Key": key, "ContentType": "video/webm"},
            ExpiresIn=PRESIGN_EXPIRATION,
        )
        return _json_response({"uploadUrl": url, "key": key})
    except ClientError as e:
        return _error(str(e), 500)


def enqueue_convert(event: dict, context) -> dict:
    """
    Recibe key del WebM subido, envía mensaje a SQS y retorna status queued.
    """
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return _error("JSON inválido")

    key = body.get("key")
    if not key or not key.startswith("uploads/"):
        return _error("Se requiere 'key' con el path del archivo (uploads/...)")

    sqs = boto3.client("sqs")
    try:
        sqs.send_message(
            QueueUrl=QUEUE_URL,
            MessageBody=json.dumps({"key": key}),
        )
        return _json_response({"key": key, "status": "queued"})
    except ClientError as e:
        return _error(f"Error al encolar: {e}", 500)


def get_status(event: dict, context) -> dict:
    """
    GET /status?key=uploads/xxx/video.webm
    Retorna { status: "processing" } o { status: "ready", downloadUrl }
    """
    params = event.get("queryStringParameters") or {}
    key = params.get("key")
    if not key or not key.startswith("uploads/"):
        return _error("Se requiere query param 'key' (uploads/...)")

    output_key = key.replace("uploads/", "converted/").rsplit(".", 1)[0] + ".mp4"
    s3 = boto3.client("s3")

    try:
        s3.head_object(Bucket=BUCKET, Key=output_key)
    except ClientError as e:
        if e.response["Error"]["Code"] == "404":
            return _json_response({"status": "processing", "key": key})
        return _error(str(e), 500)

    try:
        download_url = s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": BUCKET, "Key": output_key},
            ExpiresIn=PRESIGN_EXPIRATION,
        )
        return _json_response({
            "status": "ready",
            "key": output_key,
            "downloadUrl": download_url,
        })
    except ClientError as e:
        return _error(str(e), 500)


def convert_video_worker(event: dict, context) -> None:
    """
    Invocada por SQS. Procesa cada mensaje: descarga WebM, convierte a MP4, sube a S3.
    Timeout 900s, sin límite HTTP.
    """
    s3 = boto3.client("s3")
    for record in event.get("Records", []):
        try:
            body = json.loads(record["body"])
            key = body.get("key")
            if not key or not key.startswith("uploads/"):
                continue

            input_path = f"/tmp/input_{uuid.uuid4().hex}.webm"
            output_path = f"/tmp/output_{uuid.uuid4().hex}.mp4"
            output_key = key.replace("uploads/", "converted/").rsplit(".", 1)[0] + ".mp4"

            try:
                s3.download_file(BUCKET, key, input_path)
            except ClientError as e:
                raise RuntimeError(f"Error al descargar: {e}")

            try:
                subprocess.run(
                    [
                        FFMPEG_PATH,
                        "-y",
                        "-i", input_path,
                        "-c:v", "libx264",
                        "-pix_fmt", "yuv420p",
                        "-movflags", "+faststart",
                        output_path,
                    ],
                    check=True,
                    capture_output=True,
                    timeout=840,  # un poco menos que 900 para evitar cortes
                )
                s3.upload_file(
                    output_path,
                    BUCKET,
                    output_key,
                    ExtraArgs={"ContentType": "video/mp4"},
                )
            except subprocess.CalledProcessError as e:
                raise RuntimeError(
                    e.stderr.decode()[:500] if e.stderr else str(e)
                )
            except subprocess.TimeoutExpired:
                raise RuntimeError("Conversión superó el tiempo límite")
            except FileNotFoundError:
                raise RuntimeError("FFmpeg no disponible")
            finally:
                for p in (input_path, output_path):
                    if os.path.exists(p):
                        try:
                            os.unlink(p)
                        except OSError:
                            pass
        except Exception as e:
            raise e
