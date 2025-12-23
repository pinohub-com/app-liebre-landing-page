// ===================================
// Sistema de Carga de Secciones
// ===================================

/**
 * Carga dinámicamente las secciones HTML desde la carpeta 'secciones'
 * Esto permite una mejor organización y mantenimiento del código
 */

const Loader = {
    /**
     * Configuración de las secciones a cargar
     * Formato: { id: 'id-del-contenedor', archivo: 'nombre-del-archivo.html' }
     */
    sections: [
        { id: 'navbar-container', file: 'navbar.html' },
        { id: 'hero-container', file: 'hero.html' },
        { id: 'features-container', file: 'features.html' },
        { id: 'tatuadores-container', file: 'tatuadores.html' },
        { id: 'galeria-container', file: 'galeria.html' },
        { id: 'cta-container', file: 'cta.html' }
    ],

    /**
     * Carga una sección individual
     * @param {string} containerId - ID del contenedor donde se insertará la sección
     * @param {string} fileName - Nombre del archivo HTML a cargar
     */
    async loadSection(containerId, fileName) {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`Contenedor no encontrado: ${containerId}`);
                return;
            }

            // Mostrar indicador de carga
            container.innerHTML = '<div class="loading-spinner"></div>';

            // Cargar el archivo HTML
            const response = await fetch(`secciones/${fileName}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let html = await response.text();
            
            // Corregir rutas de imágenes y videos después de cargar
            // Esto asegura que las rutas funcionen tanto local como en S3
            html = html.replace(/src="(logo\.png|founder\.jpg)"/g, (match, filename) => {
                if (filename === 'logo.png') {
                    return 'src="/artifacts/logo.png"';
                } else if (filename === 'founder.jpg') {
                    return 'src="/artifacts/founder.jpg"';
                }
                return match;
            });
            
            // Corregir rutas de videos si no están con ruta absoluta
            html = html.replace(/src="videos\//g, 'src="/videos/');
            
            container.innerHTML = html;

            console.log(`✓ Sección cargada: ${fileName}`);
        } catch (error) {
            console.error(`Error cargando ${fileName}:`, error);
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `<div class="error-message">Error al cargar la sección</div>`;
            }
        }
    },

    /**
     * Carga todas las secciones configuradas
     */
    async loadAllSections() {
        console.log('🔄 Iniciando carga de secciones...');
        
        const loadPromises = this.sections.map(section => 
            this.loadSection(section.id, section.file)
        );

        try {
            await Promise.all(loadPromises);
            console.log('✅ Todas las secciones cargadas exitosamente');
            
            // Disparar evento personalizado cuando todas las secciones estén cargadas
            document.dispatchEvent(new Event('sectionsLoaded'));
        } catch (error) {
            console.error('❌ Error cargando algunas secciones:', error);
        }
    },

    /**
     * Inicializa el loader cuando el DOM esté listo
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadAllSections();
            });
        } else {
            this.loadAllSections();
        }
    }
};

// Auto-inicializar el loader
Loader.init();

