// ========================================
// ÉDIT MARKET PRO - ADMIN.JS
// ========================================

let adminProducts = [];

async function loadAdminProducts() {

    try {

        const response =
            await fetch('../data/products.json');

        adminProducts =
            await response.json();

        updateStats();

        renderProductsTable();

    } catch (error) {

        console.error(error);

    }

}

function updateStats() {

    const totalProducts =
        adminProducts.length;

    const categories =
        [...new Set(
            adminProducts.map(
                product => product.category
            )
        )];

    const popularProducts =
        adminProducts.filter(
            product => product.popular === true
        );

    document.getElementById(
        'total-products'
    ).textContent = totalProducts;

    document.getElementById(
        'total-categories'
    ).textContent = categories.length;

    document.getElementById(
        'total-popular'
    ).textContent = popularProducts.length;

    document.getElementById(
        'recent-count'
    ).textContent =
        Math.min(adminProducts.length, 8);

}

function renderProductsTable() {

    const tableBody =
        document.getElementById(
            'products-table-body'
        );

    if (!tableBody) return;

    tableBody.innerHTML = '';

    adminProducts.forEach(product => {

        const row =
            document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price} Ar</td>
            <td>
                ${
                    product.popular
                    ? 'Oui'
                    : 'Non'
                }
            </td>
        `;

        tableBody.appendChild(row);

    });

}

document.addEventListener(
    'DOMContentLoaded',
    loadAdminProducts
);
