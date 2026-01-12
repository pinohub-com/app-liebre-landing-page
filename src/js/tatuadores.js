// ===================================
// Tatuadores Section - Dynamic Loading
// ===================================

/**
 * Genera el HTML de las estrellas de rating
 * @param {number} rating - Rating del tatuador (0-5)
 * @returns {string} HTML de las estrellas
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Media estrella
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

/**
 * Crea una tarjeta HTML para un tatuador
 * @param {Object} tattooer - Datos del tatuador
 * @param {number} rating - Rating del tatuador
 * @returns {string} HTML de la tarjeta
 */
function createTattooerCard(tattooer, rating = 4.5) {
    const imagePath = `tattooers/${tattooer.username}/profile.jpg`;
    const displayName = tattooer.name || tattooer.username;
    
    return `
        <div class="tatuador-card">
            <div class="tatuador-image">
                <img src="${imagePath}" alt="${displayName}" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(displayName)}'">
            </div>
            <div class="tatuador-info">
                <div class="tatuador-name-wrapper">
                    <h3 class="tatuador-name">${displayName}</h3>
                    <a href="${tattooer.url}" target="_blank" rel="noopener noreferrer" class="instagram-link">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
                <div class="tatuador-rating">
                    <div class="stars">
                        ${generateStars(rating)}
                    </div>
                    <span class="rating-number">${rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Carga y renderiza los tatuadores
 */
async function initTatuadores() {
    const gridContainer = document.querySelector('.tatuadores-grid');
    if (!gridContainer) {
        console.warn('No se encontró el contenedor .tatuadores-grid');
        return;
    }
    
    try {
        // Cargar datos de tatuadores
        const response = await fetch('tattooers_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tattooersData = await response.json();
        
        // Limpiar el contenedor
        gridContainer.innerHTML = '';
        
        // Generar ratings aleatorios (puedes ajustar esto después)
        const ratings = {
            'queso.ink': 4.9,
            'bsterlink': 4.7,
            'dezzer_liner': 4.8,
            'sottoo_tattoo': 4.6,
            'dany_tattoo_artist': 4.5
        };
        
        // Crear tarjetas para cada tatuador
        Object.values(tattooersData).forEach(tattooer => {
            const rating = ratings[tattooer.username] || 4.5;
            const cardHTML = createTattooerCard(tattooer, rating);
            gridContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
        
        console.log(`✅ ${Object.keys(tattooersData).length} tatuadores cargados exitosamente`);
    } catch (error) {
        console.error('❌ Error cargando tatuadores:', error);
        // Mostrar mensaje de error o contenido por defecto
        gridContainer.innerHTML = '<p style="text-align: center; color: #685D54;">Error cargando los tatuadores. Por favor, recarga la página.</p>';
    }
}
