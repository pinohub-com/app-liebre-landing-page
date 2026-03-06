#!/usr/bin/env node
/**
 * Servidor para el Slide Creator con headers de Cross-Origin Isolation.
 * Requerido para FFmpeg.wasm (SharedArrayBuffer).
 *
 * Uso: node server.js
 * Luego abre http://localhost:3000/creator/
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const BASE = path.join(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const COOP_COEP = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless'
};

const server = http.createServer((req, res) => {
  let u = req.url.split('?')[0];
  if (u === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }
  if (u === '/' || u === '/creator' || u === '/creator/') u = '/creator/index.html';
  let p = path.join(BASE, ...u.split('/').filter(Boolean));
  if (!p.startsWith(BASE)) p = path.join(BASE, 'creator', 'index.html');

  fs.readFile(p, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(500);
      res.end(String(err));
      return;
    }
    const ext = path.extname(p);
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': mime,
      ...COOP_COEP
    });
    res.end(data);
  });
});

function tryListen(port) {
  server.listen(port, () => {
    console.log(`Slide Creator: http://localhost:${port}/creator/`);
    console.log('(Headers COOP/COEP activos para FFmpeg.wasm)');
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port === PORT) {
      console.warn(`Puerto ${port} en uso, intentando ${port + 1}...`);
      tryListen(port + 1);
    } else {
      throw err;
    }
  });
}
tryListen(PORT);
