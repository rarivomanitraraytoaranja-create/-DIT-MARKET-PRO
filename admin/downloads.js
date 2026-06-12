const downloadsGrid = document.getElementById("downloadsGrid");

const products =
    JSON.parse(
        localStorage.getItem("editmarket_products")
    ) || [];

function renderDownloads() {

    if (!products.length) {

        downloadsGrid.innerHTML = `
            <div class="empty-state">
                Aucun produit disponible.
            </div>
        `;

        return;
    }

    downloadsGrid.innerHTML = products
        .map(product => {

            return `
                <div class="download-card">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="download-image"
                    >

                    <div class="download-content">

                        <div class="download-title">
                            ${product.name}
                        </div>

                        <div class="download-category">
                            ${product.category}
                        </div>

                        <button
                            class="download-link"
                            onclick="copyDownloadLink('${product.download}')"
                        >
                            Copier le lien
                        </button>

                    </div>

                </div>
            `;
        })
        .join("");
}

function copyDownloadLink(link) {

    if (!link) {
        alert("Aucun lien disponible.");
        return;
    }

    navigator.clipboard.writeText(link);

    alert("Lien copié.");
}

renderDownloads();
