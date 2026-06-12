// ===============================
// ÉDIT MARKET PRO - VANILLA PAY (SIMULATION)
// ===============================

function startPayment() {
    let cart = JSON.parse(localStorage.getItem("edit_cart")) || [];

    if (cart.length === 0) {
        alert("Panier vide");
        return;
    }

    let total = cart.reduce((t, i) => t + i.price * i.quantity, 0);

    // Simulation paiement Vanilla Pay
    alert("Redirection vers Vanilla Pay...\nTotal: " + total + " €");

    setTimeout(() => {
        completePayment(total);
    }, 2000);
}

// ===============================
// VALIDATION PAIEMENT
// ===============================
function completePayment(total) {

    let cart = JSON.parse(localStorage.getItem("edit_cart")) || [];

    let orders = JSON.parse(localStorage.getItem("edit_orders")) || [];

    orders.push({
        id: "VP-" + Date.now(),
        items: cart,
        total: total,
        date: new Date().toISOString(),
        status: "paid"
    });

    localStorage.setItem("edit_orders", JSON.stringify(orders));
    localStorage.removeItem("edit_cart");

    alert("Paiement réussi ✅");

    window.location.href = "index.html";
}
