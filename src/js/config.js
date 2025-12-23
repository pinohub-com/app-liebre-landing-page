// ===================================
// Configuración de Assets y URLs
// ===================================

/**
 * Configuración de URLs base para assets (imágenes, videos, etc.)
 * 
 * Si ASSETS_BASE_URL está definido, se usará para todas las rutas de assets.
 * Si no está definido, se usarán rutas absolutas desde la raíz.
 * 
 * Para usar URLs de S3 directamente, descomenta y configura:
 * const ASSETS_BASE_URL = 'http://app-pinohub-landing.s3-website-us-east-1.amazonaws.com';
 * 
 * O para CloudFront:
 * const ASSETS_BASE_URL = 'https://d111111abcdef8.cloudfront.net';
 */

const CONFIG = {
    // URL base para assets (imágenes, videos, etc.)
    // Si está vacío, se usarán rutas absolutas desde la raíz
    ASSETS_BASE_URL: '',
    
    // Bucket S3 (solo para referencia, no se usa directamente)
    S3_BUCKET: 'app-pinohub-landing',
    S3_REGION: 'us-east-1'
};

/**
 * Obtiene la URL completa para un asset
 * @param {string} path - Ruta del asset (ej: '/artifacts/logo.png')
 * @returns {string} URL completa del asset
 */
function getAssetUrl(path) {
    // Asegurar que el path comience con /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    // Si hay una URL base configurada, usarla
    if (CONFIG.ASSETS_BASE_URL) {
        return `${CONFIG.ASSETS_BASE_URL}${normalizedPath}`;
    }
    
    // Si no, usar ruta absoluta (funciona tanto local como en S3)
    return normalizedPath;
}

// Exportar para uso en otros scripts si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, getAssetUrl };
}

