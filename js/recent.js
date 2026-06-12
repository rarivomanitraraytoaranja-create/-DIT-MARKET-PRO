// ========================================
// ÉDIT MARKET PRO - RECENT.JS
// Affichage des produits récents
// ========================================

let recentProducts = [];

async function loadRecentProducts() {
    try {

        const response = await fetch('./data/products.json');
        const products = await response.json();

        recentProducts = [...products]
            .sort((a, b) => {
                return (b.id || 0) - (a.id || 0);
            })
            .slice(0, 8);

        displayRecentProducts();

    } catch (error) {

        console.error(
            'Erreur chargement produits récents :',
            error
        );

    }
}

function displayRecentProducts() {

    const container =
        document.getElementById('recent-products');

    if (!container) return;

    container.innerHTML = '';

    if (recentProducts.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>Aucun produit récent</h3>
            </div>
        `;

        return;
    }

    recentProducts.forEach(product => {

        const card = document.createElement('div');

        card.classList.add('product-card');

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </div>

            <div class="product-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-price">
                    ${product.price} Ar
                </div>

                <a
                    href="product.html?id=${product.id}"
                    class="product-button"
                >
                    Voir le produit
                </a>

            </div>
        `;

        container.appendChild(card);

    });

}

document.addEventListener(
    'DOMContentLoaded',
    () => {
        loadRecentProducts();
    }
);
