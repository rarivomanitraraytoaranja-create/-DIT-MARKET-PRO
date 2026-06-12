// ========================================
// ÉDIT MARKET PRO - SEARCH.JS
// Recherche dynamique des produits
// ========================================

let allProducts = [];

async function loadProducts() {
    try {
        const response = await fetch('./data/products.json');
        allProducts = await response.json();
    } catch (error) {
        console.error('Erreur chargement produits :', error);
    }
}

function searchProducts(query) {
    const search = query.toLowerCase().trim();

    if (!search) {
        return allProducts;
    }

    return allProducts.filter(product => {
        return (
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        );
    });
}

function displaySearchResults(results) {
    const container = document.getElementById('products-container');

    if (!container) return;

    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>Aucun produit trouvé</h3>
                <p>Essayez un autre mot-clé.</p>
            </div>
        `;
        return;
    }

    results.forEach(product => {
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

async function initSearch() {
    await loadProducts();

    const searchInput = document.getElementById('search-input');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const results = searchProducts(e.target.value);
        displaySearchResults(results);
    });
}

document.addEventListener('DOMContentLoaded', initSearch);
