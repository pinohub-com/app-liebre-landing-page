"""
API para crear reels desde slides.

POST /create-reel: Recibe 8 imágenes base64, crea MP4 en full res, retorna downloadUrl.
"""

import base64
import json
import os
import subprocess
import uuid

import boto3

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


# Mapeo transición frontend -> FFmpeg xfade (zoom-in/out/none -> fade)
XFADE_MAP = {
    "fade": "fade",
    "slide-left": "slideleft",
    "slide-right": "slideright",
    "slide-up": "slideup",
    "slide-down": "slidedown",
    "zoom-in": "fade",
    "zoom-out": "fade",
    "none": "fade",
}


def create_reel_from_slides(event: dict, context) -> dict:
    """
    Recibe 8 imágenes base64 (JPEG), crea MP4 en full res con FFmpeg,
    sube a S3 y retorna downloadUrl.
    Body: { images, slideDuration | slideDurations, transDuration, transition, width, height }
    """
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return _error("JSON inválido")

    images = body.get("images")
    if not images or not isinstance(images, list) or len(images) != 8:
        return _error("Se requieren exactamente 8 imágenes en 'images'")

    # slideDurations (8 floats) o slideDuration (único)
    if "slideDurations" in body:
        raw_dur = body["slideDurations"]
        if not isinstance(raw_dur, list) or len(raw_dur) != 8:
            return _error("slideDurations debe ser un array de 8 números")
        slide_durations = [float(x) for x in raw_dur]
    else:
        single = float(body.get("slideDuration", 3))
        slide_durations = [single] * 8

    trans_duration = float(body.get("transDuration", 0.5))
    transition = body.get("transition", "fade")
    width = int(body.get("width", 1080))
    height = int(body.get("height", 1350))

    xfade_trans = XFADE_MAP.get(transition, "fade")
    use_xfade = trans_duration > 0 and transition != "none"

    job_id = uuid.uuid4().hex
    input_paths = []
    output_path = f"/tmp/reel_{job_id}.mp4"
    output_key = f"reels/{job_id}/reel.mp4"

    try:
        for i, b64 in enumerate(images):
            if not isinstance(b64, str):
                return _error(f"Imagen {i} debe ser base64 string")
            raw = base64.b64decode(b64)
            path = f"/tmp/img_{job_id}_{i}.jpg"
            with open(path, "wb") as f:
                f.write(raw)
            input_paths.append(path)

        if use_xfade:
            scale_parts = [f"[{i}:v]scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p[v{i}]" for i in range(8)]
            xfade_parts = []
            prev = "[v0]"
            for i in range(1, 8):
                offset = sum(slide_durations[:i]) - i * trans_duration
                curr_label = f"v{i}"
                out_label = "out" if i == 7 else f"x{i}"
                xfade_parts.append(
                    f"{prev}[{curr_label}]xfade=transition={xfade_trans}:duration={trans_duration}:offset={offset}[{out_label}]"
                )
                prev = f"[{out_label}]"
            filter_str = ";".join(scale_parts) + ";" + ";".join(xfade_parts)
        else:
            filter_parts = [
                *[f"[{i}:v]scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p[v{i}]" for i in range(8)],
                "[v0][v1][v2][v3][v4][v5][v6][v7]concat=n=8:v=1:a=0[out]",
            ]
            filter_str = ";".join(filter_parts)

        args = ["-y"]
        for i in range(8):
            args.extend(["-loop", "1", "-t", str(slide_durations[i]), "-i", input_paths[i]])
        args.extend([
            "-filter_complex", filter_str,
            "-map", "[out]",
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-crf", "26",
            "-r", "30",
            "-movflags", "+faststart",
            output_path
        ])

        subprocess.run(
            [FFMPEG_PATH] + args,
            check=True,
            capture_output=True,
            timeout=120,
        )

        s3 = boto3.client("s3")
        s3.upload_file(
            output_path,
            BUCKET,
            output_key,
            ExtraArgs={"ContentType": "video/mp4"},
        )

        download_url = s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": BUCKET, "Key": output_key},
            ExpiresIn=PRESIGN_EXPIRATION,
        )
        return _json_response({"downloadUrl": download_url, "key": output_key})
    except subprocess.CalledProcessError as e:
        return _error(
            (e.stderr.decode()[:500] if e.stderr else str(e)) or "Error FFmpeg",
            500,
        )
    except subprocess.TimeoutExpired:
        return _error("Conversión superó el tiempo límite", 500)
    except FileNotFoundError:
        return _error("FFmpeg no disponible", 500)
    except Exception as e:
        return _error(str(e), 500)
    finally:
        for p in input_paths + [output_path]:
            if p and os.path.exists(p):
                try:
                    os.unlink(p)
                except OSError:
                    pass
