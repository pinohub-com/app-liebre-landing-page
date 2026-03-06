# Backend: Conversión WebM → MP4 (asíncrono)

Servicio serverless (Serverless Framework v4) que convierte videos WebM a MP4 mediante una cola SQS y Lambda con timeout de 900 segundos.

## Arquitectura

1. **POST /upload-url** — URL firmada para subir el WebM a S3
2. **POST /convert** — Encola la conversión en SQS, retorna `{ key, status: "queued" }`
3. **GET /status?key=...** — Consulta si el MP4 está listo; si sí, retorna `downloadUrl`
4. **SQS** → **videoConverter Lambda** (timeout 900s) — Descarga WebM, convierte con FFmpeg, sube MP4 a S3

## Flujo

1. **POST /upload-url**  
   Body: `{ "filename": "reel.webm" }`  
   Response: `{ "uploadUrl": "https://...", "key": "uploads/xxx/reel.webm" }`

2. El frontend sube el WebM directamente a `uploadUrl` (PUT).

3. **POST /convert**  
   Body: `{ "key": "uploads/xxx/reel.webm" }`  
   Response: `{ "key": "uploads/xxx/reel.webm", "status": "queued" }`

4. El frontend hace polling a **GET /status?key=uploads/xxx/reel.webm**
   - `{ "status": "processing" }` → seguir consultando
   - `{ "status": "ready", "downloadUrl": "https://..." }` → descargar MP4

## Requisitos

- Node.js (para Serverless Framework)
- Cuenta AWS configurada (`aws configure`)

## Preparar la capa FFmpeg

```bash
chmod +x setup-layer.sh
./setup-layer.sh
```

## Desplegar

```bash
cd content/backend
serverless deploy --stage dev
```

## Variables de entorno / Outputs

- URL base de la API (`/upload-url`, `/convert`, `/status`)
- Nombre del bucket S3
- Cola SQS para conversiones

## Limpieza de archivos

Los archivos en `uploads/` y `converted/` se eliminan automáticamente tras 1 día (Lifecycle del bucket).
