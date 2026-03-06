#!/bin/bash
# Descarga FFmpeg estático y prepara la capa Lambda

set -e
LAYER_DIR="layer"
BIN_DIR="$LAYER_DIR/bin"
ARCHIVE="ffmpeg-release-amd64-static.tar.xz"
URL="https://johnvansickle.com/ffmpeg/releases/${ARCHIVE}"

mkdir -p "$BIN_DIR"
cd "$(dirname "$0")"

if [ ! -f "$BIN_DIR/ffmpeg" ]; then
  echo "Descargando FFmpeg..."
  curl -sL -o "$ARCHIVE" "$URL"
  echo "Extrayendo..."
  tar xf "$ARCHIVE"
  EXTRACTED=$(ls -d ffmpeg-*-amd64-static 2>/dev/null | head -1)
  mv "$EXTRACTED/ffmpeg" "$BIN_DIR/"
  mv "$EXTRACTED/ffprobe" "$BIN_DIR/"
  rm -rf "$EXTRACTED" "$ARCHIVE"
  chmod +x "$BIN_DIR/ffmpeg" "$BIN_DIR/ffprobe"
  echo "Capa FFmpeg lista en $LAYER_DIR"
else
  echo "FFmpeg ya existe en $LAYER_DIR"
fi
