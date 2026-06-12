// ========================================
// ÉDIT MARKET PRO - POPULAR.JS
// Affichage des produits populaires
// ========================================

let popularProducts = [];

async function loadPopularProducts() {
    try {
        const response = await fetch('./data/products.json');
        const products = await response.json();

        popularProducts = products.filter(product => {
            return product.popular === true;
        });

        displayPopularProducts();

    } catch (error) {
        console.error('Erreur chargement produits populaires :', error);
    }
}

function displayPopularProducts() {

    const container = document.getElementById('popular-products');

    if (!container) return;

    container.innerHTML = '';

    if (popularProducts.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>Aucun produit populaire</h3>
            </div>
        `;

        return;
    }

    popularProducts.forEach(product => {

        const card = document.createElement('div');

        card.classList.add('product-card');

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-content">
                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-price">
                    ${product.price} Ar
                </div>

                <a href="product.html?id=${product.id}" class="product-button">
                    Voir le produit
                </a>
            </div>
        `;

        container.appendChild(card);

    });

}

document.addEventListener('DOMContentLoaded', () => {
    loadPopularProducts();
});
