# Estructura de la landing para migración a React

## Assets centralizados en `artifacts/`

Todos los elementos estáticos necesarios para la landing están en `src/artifacts/`:

```
artifacts/
├── tattooers/           # Fotos de perfil y contenido de tatuadores
├── tattooers_data.json  # Datos de tatuadores (fetch en runtime)
├── textures/            # Fondos y texturas CSS
├── queso.ink/posts/     # Imágenes de galería
├── logo.svg, logo.png
├── founder.jpg
├── hero-background.png, mobile_background.PNG
├── notas.png, calendario.png, calculadora.png, flechas.png
└── ...
```

## Rutas en el código

- **Imágenes:** `/artifacts/...` (ej. `/artifacts/logo.svg`, `/artifacts/tattooers/queso.ink/profile.jpg`)
- **Secciones HTML:** `/secciones/...` (ej. `/secciones/hero.html`)
- **Datos:** `/artifacts/tattooers_data.json`

## Migración a React

Al integrar en una app React:

1. Copiar `src/artifacts/` → `public/artifacts/` (Vite/CRA sirven `public/` en la raíz).
2. Copiar `src/secciones/` → `public/secciones/` si se siguen cargando por fetch, o convertir a componentes React.
3. Las rutas `/artifacts/...` y `/secciones/...` funcionan sin cambios cuando la app se sirve desde la raíz.
