# Liebre - Landing Page

Landing page para Liebre, una aplicación de gestión para tatuadores.

## 🚀 Ejecutar en Local

Esta es una aplicación web estática (HTML/CSS/JavaScript). Para ejecutarla localmente, necesitas un servidor HTTP simple.

### Opción 1: Usando Python (Recomendado)

Si tienes Python instalado (viene preinstalado en la mayoría de sistemas):

```bash
# Navegar a la carpeta src
cd src

# Python 3
python -m http.server 8000

# O si tienes Python 2
python -m SimpleHTTPServer 8000
```

Luego abre tu navegador en: **http://localhost:8000**

### Opción 2: Usando Node.js

Si tienes Node.js instalado:

```bash
# Instalar http-server globalmente (solo la primera vez)
npm install -g http-server

# Navegar a la carpeta src
cd src

# Ejecutar el servidor
http-server -p 8000
```

O usando npx (sin instalar globalmente):

```bash
cd src
npx http-server -p 8000
```

Luego abre tu navegador en: **http://localhost:8000**

### Opción 3: Usando PHP

Si tienes PHP instalado:

```bash
cd src
php -S localhost:8000
```

Luego abre tu navegador en: **http://localhost:8000**

### Opción 4: Usando VS Code Live Server

Si usas Visual Studio Code:

1. Instala la extensión "Live Server"
2. Abre el archivo `src/index.html`
3. Haz clic derecho y selecciona "Open with Live Server"

## 📁 Estructura del Proyecto

```
.
├── src/                    # Código fuente de la aplicación
│   ├── index.html         # Página principal
│   ├── css/               # Estilos CSS
│   ├── js/                # Scripts JavaScript
│   ├── secciones/         # Secciones HTML modulares
│   ├── artifacts/         # Imágenes y recursos estáticos
│   └── tattooers/         # Datos de tatuadores
├── download_tattooers.py  # Script para descargar datos de tatuadores
└── requirements.txt       # Dependencias de Python
```

## 🔧 Dependencias

### Para ejecutar la aplicación web:
- Solo necesitas un servidor HTTP simple (Python, Node.js, PHP, etc.)
- No se requieren dependencias adicionales

### Para el script de descarga de tatuadores:
```bash
pip install -r requirements.txt
```

## 📝 Notas

- **Importante**: No abras directamente el archivo `index.html` en el navegador. La aplicación usa `fetch()` para cargar secciones dinámicamente, lo que requiere un servidor HTTP.

- El puerto 8000 es solo un ejemplo. Puedes usar cualquier puerto disponible (8080, 3000, etc.).

- Si cambias el puerto, recuerda actualizar la URL en el navegador.

## 🐛 Solución de Problemas

### Error: "Failed to fetch" o "CORS error"
- Asegúrate de estar usando un servidor HTTP, no abriendo el archivo directamente.

### Las imágenes no se cargan
- Verifica que estés ejecutando el servidor desde la carpeta `src/`
- Verifica que las rutas en el código sean correctas (rutas absolutas desde `/`)

### El servidor no inicia
- Verifica que el puerto no esté en uso por otra aplicación
- Prueba con otro puerto: `python -m http.server 8080`




