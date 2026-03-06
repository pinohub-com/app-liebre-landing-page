"""
API para convertir videos WebM a MP4.
- POST /upload-url: Retorna URL firmada para subir el WebM
- POST /convert: Recibe key del archivo subido, convierte a MP4, retorna URL firmada de descarga
"""

import json
import os
import subprocess
import uuid

import boto3
from botocore.exceptions import ClientError

BUCKET = os.environ.get("BUCKET_NAME")
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


def convert_to_mp4(event: dict, context) -> dict:
    """
    Descarga el WebM de S3, lo convierte a MP4 con FFmpeg,
    sube el resultado y retorna URL firmada de descarga.
    """
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return _error("JSON inválido")

    key = body.get("key")
    if not key or not key.startswith("uploads/"):
        return _error("Se requiere 'key' con el path del archivo subido (uploads/...)")

    s3 = boto3.client("s3")
    input_path = f"/tmp/input_{uuid.uuid4().hex}.webm"
    output_path = f"/tmp/output_{uuid.uuid4().hex}.mp4"
    output_key = key.replace("uploads/", "converted/").rsplit(".", 1)[0] + ".mp4"

    try:
        s3.download_file(BUCKET, key, input_path)
    except ClientError as e:
        return _error(f"Error al descargar: {e}", 404)

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
            timeout=240,
        )
    except subprocess.CalledProcessError as e:
        return _error(f"Error FFmpeg: {e.stderr.decode()[:500]}" if e.stderr else str(e), 500)
    except subprocess.TimeoutExpired:
        return _error("Conversión superó el tiempo límite", 500)
    except FileNotFoundError:
        return _error("FFmpeg no disponible. Verifica la capa Lambda.", 500)
    finally:
        if os.path.exists(input_path):
            try:
                os.unlink(input_path)
            except OSError:
                pass

    try:
        s3.upload_file(
            output_path,
            BUCKET,
            output_key,
            ExtraArgs={"ContentType": "video/mp4"},
        )
    except ClientError as e:
        return _error(f"Error al subir MP4: {e}", 500)
    finally:
        if os.path.exists(output_path):
            try:
                os.unlink(output_path)
            except OSError:
                pass

    try:
        download_url = s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": BUCKET, "Key": output_key},
            ExpiresIn=PRESIGN_EXPIRATION,
        )
        return _json_response({
            "downloadUrl": download_url,
            "key": output_key,
        })
    except ClientError as e:
        return _error(str(e), 500)
