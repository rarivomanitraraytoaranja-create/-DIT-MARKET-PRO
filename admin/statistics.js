const totalProducts = document.getElementById("totalProducts");
const totalCategories = document.getElementById("totalCategories");
const catalogValue = document.getElementById("catalogValue");
const averagePrice = document.getElementById("averagePrice");
const productsTable = document.getElementById("productsTable");

const products =
    JSON.parse(
        localStorage.getItem("editmarket_products")
    ) || [];

function formatNumber(number) {
    return Number(number).toLocaleString("fr-FR");
}

function loadStatistics() {

    const categories = new Set();

    let totalValue = 0;

    products.forEach(product => {

        categories.add(product.category);

        totalValue += Number(product.price) || 0;
    });

    const average =
        products.length > 0
            ? Math.round(totalValue / products.length)
            : 0;

    totalProducts.textContent =
        formatNumber(products.length);

    totalCategories.textContent =
        formatNumber(categories.size);

    catalogValue.textContent =
        `${formatNumber(totalValue)} Ar`;

    averagePrice.textContent =
        `${formatNumber(average)} Ar`;

    if (!products.length) {

        productsTable.innerHTML = `
            <tr>
                <td colspan="3">
                    Aucun produit enregistré
                </td>
            </tr>
        `;

        return;
    }

    productsTable.innerHTML = products
        .map(product => {

            return `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${formatNumber(product.price)} Ar</td>
                </tr>
            `;
        })
        .join("");
}

loadStatistics();
