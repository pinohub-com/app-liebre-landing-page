# Slide Creator — Parrilla Flou

Herramienta para generar slides en JPG a partir de la parrilla de contenido, con diseño estilo Gamma/Instagram.

## Uso

1. **Servir con un servidor local** (necesario para cargar `parrilla.json`):
   ```bash
   # Opción A: Para usar "Convertir localmente" (FFmpeg.wasm)
   cd content/creator
   node server.js
   ```
   Luego abre: `http://localhost:3000/creator/`

   ```bash
   # Opción B: Sin FFmpeg local (solo conversión por backend)
   npx serve content
   ```
   Abre: `http://localhost:3000/creator/`

   > **Nota**: "Convertir localmente" necesita los headers COOP/COEP (servidor propio). Usa `node server.js` para ello.

2. Abre en el navegador la URL indicada

3. **Selector de día**: Elige el día (1–30) de la parrilla

4. **Editar contenido**: Modifica título y cuerpo de cada slide; los cambios se reflejan al instante

5. **Imagen de fondo**: Sube una imagen (ej. estatua, textura) que se usará como marca de agua en todas las slides

6. **Foto por slide**: Opcionalmente añade una imagen específica para el slide actual

7. **Exportar**:
   - **Descargar slide actual (JPG)**: Genera un JPG 1080×1350 (formato Instagram carrusel 4:5) del slide que estás viendo
   - **Descargar los 8 slides (JPG)**: Genera los 8 JPG del día seleccionado

## Estructura

- `index.html` — Interfaz
- `styles.css` — Estilos del creador y del diseño de los slides
- `script.js` — Lógica y exportación con html2canvas
- `../parrilla.json` — Contenido de los 30 días (8 slides cada uno)

## Formato de slides

- Fondo beige claro (#e8e4df)
- Texto oscuro
- Logo Flou en la esquina superior derecha
- Slide tipo CTA: caja destacada al final con el mensaje de seguir la cuenta
