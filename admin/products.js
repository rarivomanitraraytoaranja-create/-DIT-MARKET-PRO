const productsContainer = document.getElementById("productsContainer");
const productModal = document.getElementById("productModal");
const openModalBtn = document.getElementById("openModalBtn");
const cancelModal = document.getElementById("cancelModal");
const saveProduct = document.getElementById("saveProduct");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productImage = document.getElementById("productImage");
const productDescription = document.getElementById("productDescription");
const productDownload = document.getElementById("productDownload");

let products = JSON.parse(localStorage.getItem("editmarket_products")) || [];
let editingIndex = null;

function saveProducts() {
    localStorage.setItem(
        "editmarket_products",
        JSON.stringify(products)
    );
}

function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productImage.value = "";
    productDescription.value = "";
    productDownload.value = "";
}

function openModal() {
    productModal.classList.add("active");
}

function closeModal() {
    productModal.classList.remove("active");
    clearForm();
    editingIndex = null;
}

function renderProducts() {

    if (!products.length) {

        productsContainer.innerHTML = `
            <div class="empty-products">
                Aucun produit enregistré.
            </div>
        `;

        return;
    }

    productsContainer.innerHTML = products
        .map((product, index) => {

            return `
                <div class="product-card">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image"
                    >

                    <div class="product-content">

                        <div class="product-name">
                            ${product.name}
                        </div>

                        <div class="product-category">
                            ${product.category}
                        </div>

                        <div class="product-price">
                            ${product.price} Ar
                        </div>

                        <div class="product-actions">

                            <button
                                class="edit-btn"
                                onclick="editProduct(${index})"
                            >
                                Modifier
                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteProduct(${index})"
                            >
                                Supprimer
                            </button>

                        </div>

                    </div>

                </div>
            `;
        })
        .join("");
}

function editProduct(index) {

    const product = products[index];

    productName.value = product.name;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productImage.value = product.image;
    productDescription.value = product.description;
    productDownload.value = product.download;

    editingIndex = index;

    openModal();
}

function deleteProduct(index) {

    const confirmation = confirm(
        "Supprimer ce produit ?"
    );

    if (!confirmation) return;

    products.splice(index, 1);

    saveProducts();

    renderProducts();
}

saveProduct.addEventListener("click", () => {

    const newProduct = {
        id: Date.now(),
        name: productName.value.trim(),
        price: productPrice.value.trim(),
        category: productCategory.value.trim(),
        image: productImage.value.trim(),
        description: productDescription.value.trim(),
        download: productDownload.value.trim()
    };

    if (
        !newProduct.name ||
        !newProduct.price ||
        !newProduct.category
    ) {
        alert("Veuillez remplir les champs obligatoires.");
        return;
    }

    if (editingIndex !== null) {

        products[editingIndex] = {
            ...products[editingIndex],
            ...newProduct
        };

    } else {

        products.unshift(newProduct);
    }

    saveProducts();

    renderProducts();

    closeModal();
});

openModalBtn.addEventListener("click", () => {
    clearForm();
    openModal();
});

cancelModal.addEventListener("click", closeModal);

productModal.addEventListener("click", (e) => {

    if (e.target === productModal) {
        closeModal();
    }
});

renderProducts();
