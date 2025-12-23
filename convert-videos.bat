@echo off
REM Comandos para convertir los 3 videos de .MOV a .MP4 con alta calidad
REM Ejecuta este archivo desde la raíz del proyecto

echo ========================================
echo Convirtiendo videos .MOV a .MP4
echo ========================================
echo.

REM Verificar si ffmpeg está instalado
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: ffmpeg no esta instalado o no esta en el PATH
    echo.
    echo Para instalar ffmpeg:
    echo 1. Descarga desde: https://www.gyan.dev/ffmpeg/builds/
    echo 2. O usa chocolatey: choco install ffmpeg
    echo 3. O usa winget: winget install ffmpeg
    pause
    exit /b 1
)

echo [OK] ffmpeg encontrado
echo.

REM Crear directorio de salida si no existe
if not exist "src\videos" mkdir "src\videos"

echo [1/3] Convirtiendo IMG_1924.MOV...
ffmpeg -i "src\artifacts\moda\IMG_1924.MOV" -c:v libx264 -preset veryslow -crf 18 -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p -y "src\videos\IMG_1924.mp4"
if %ERRORLEVEL% EQU 0 (
    echo   [OK] IMG_1924.mp4 convertido exitosamente
) else (
    echo   [ERROR] Error al convertir IMG_1924.MOV
)
echo.

echo [2/3] Convirtiendo IMG_1904.MOV...
ffmpeg -i "src\artifacts\moda\IMG_1904.MOV" -c:v libx264 -preset veryslow -crf 18 -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p -y "src\videos\IMG_1904.mp4"
if %ERRORLEVEL% EQU 0 (
    echo   [OK] IMG_1904.mp4 convertido exitosamente
) else (
    echo   [ERROR] Error al convertir IMG_1904.MOV
)
echo.

echo [3/3] Convirtiendo IMG_1885.MOV...
ffmpeg -i "src\artifacts\moda\IMG_1885.MOV" -c:v libx264 -preset veryslow -crf 18 -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p -y "src\videos\IMG_1885.mp4"
if %ERRORLEVEL% EQU 0 (
    echo   [OK] IMG_1885.mp4 convertido exitosamente
) else (
    echo   [ERROR] Error al convertir IMG_1885.MOV
)
echo.

echo ========================================
echo Conversion completada!
echo ========================================
echo.
echo Videos convertidos en: src\videos\
echo.
pause

