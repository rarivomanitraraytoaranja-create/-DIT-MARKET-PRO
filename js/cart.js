// ===============================
// ÉDIT MARKET PRO - CART SYSTEM
// ===============================

let cart = JSON.parse(localStorage.getItem("edit_cart")) || [];

// ===============================
// AJOUTER AU PANIER
// ===============================
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
}

// ===============================
// SUPPRIMER PRODUIT
// ===============================
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// ===============================
// MODIFIER QUANTITÉ
// ===============================
function updateQuantity(productId, quantity) {
    const item = cart.find(p => p.id === productId);

    if (item) {
        item.quantity = parseInt(quantity);

        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }

    saveCart();
    updateCartUI();
}

// ===============================
// TOTAL PANIER
// ===============================
function getTotal() {
    return cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
}

// ===============================
// SAUVEGARDE LOCALSTORAGE
// ===============================
function saveCart() {
    localStorage.setItem("edit_cart", JSON.stringify(cart));
}

// ===============================
// AFFICHAGE PANIER (UI)
// ===============================
function updateCartUI() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.image}" width="50">
            <span>${item.name}</span>
            <span>${item.price} €</span>

            <input type="number" min="1" value="${item.quantity}"
                onchange="updateQuantity('${item.id}', this.value)">

            <button onclick="removeFromCart('${item.id}')">❌</button>
        `;

        cartContainer.appendChild(div);
    });

    if (totalContainer) {
        totalContainer.innerText = getTotal() + " €";
    }
}

// ===============================
// INITIALISATION
// ===============================
document.addEventListener("DOMContentLoaded", updateCartUI);
