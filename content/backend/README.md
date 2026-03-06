# Backend: Conversión WebM → MP4

Servicio serverless (Serverless Framework v4) que recibe un video WebM, lo convierte a MP4 y retorna una URL firmada de S3 para descargarlo.

## Flujo

1. **POST /upload-url**  
   Body: `{ "filename": "reel.webm" }`  
   Response: `{ "uploadUrl": "https://...", "key": "uploads/xxx/reel.webm" }`

2. El frontend sube el WebM directamente a `uploadUrl` (PUT).

3. **POST /convert**  
   Body: `{ "key": "uploads/xxx/reel.webm" }`  
   Response: `{ "downloadUrl": "https://...", "key": "converted/xxx/reel.mp4" }`

## Requisitos

- Node.js (para Serverless Framework)
- Cuenta AWS configurada (`aws configure`)

## Preparar la capa FFmpeg

```bash
chmod +x setup-layer.sh
./setup-layer.sh
```

Esto descarga el binario estático de FFmpeg y lo coloca en `layer/bin/`.

## Desplegar

```bash
cd content/backend
serverless deploy --stage dev
```

(Usa Serverless instalado globalmente: `npm install -g serverless`)

## Variables de entorno / Outputs

Tras el deploy se obtienen:

- URL base de la API (endpoints: `/upload-url`, `/convert`)
- Nombre del bucket S3

## Uso desde el frontend (creator)

```javascript
// 1. Obtener URL de subida
const { uploadUrl, key } = await fetch(API_URL + '/upload-url', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ filename: 'reel.webm' })
}).then(r => r.json());

// 2. Subir el WebM
await fetch(uploadUrl, {
  method: 'PUT',
  body: webmBlob,
  headers: { 'Content-Type': 'video/webm' }
});

// 3. Convertir y obtener URL de descarga
const { downloadUrl } = await fetch(API_URL + '/convert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key })
}).then(r => r.json());

// 4. Descargar el MP4
window.open(downloadUrl);
```

## Limpieza de archivos

Los archivos en `uploads/` y `converted/` se eliminan automáticamente tras 1 día (Lifecycle del bucket).
