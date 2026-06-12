// ========================================
// ÉDIT MARKET PRO - FILTERS.JS
// Filtrage des produits par catégorie
// ========================================

let filterProductsData = [];

async function loadFilterProducts() {
    try {
        const response = await fetch('./data/products.json');
        filterProductsData = await response.json();
    } catch (error) {
        console.error('Erreur chargement filtres :', error);
    }
}

function filterProducts(category) {
    const container = document.getElementById('products-container');

    if (!container) return;

    container.innerHTML = '';

    let productsToShow = filterProductsData;

    if (category !== 'all') {
        productsToShow = filterProductsData.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (productsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>Aucun produit trouvé</h3>
                <p>Aucun produit dans cette catégorie.</p>
            </div>
        `;
        return;
    }

    productsToShow.forEach(product => {
        const card = document.createElement('div');

        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} Ar</p>

            <a href="product.html?id=${product.id}">
                Voir le produit
            </a>
        `;

        container.appendChild(card);
    });
}

async function initFilters() {
    await loadFilterProducts();

    const buttons = document.querySelectorAll('[data-category]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            buttons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            const category = button.dataset.category;

            filterProducts(category);
        });
    });
}

document.addEventListener('DOMContentLoaded', initFilters);
