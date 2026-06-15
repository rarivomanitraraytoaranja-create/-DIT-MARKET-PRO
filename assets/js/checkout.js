/**
 * 💳 ÉDIT MARKET PRO — CHECKOUT SYSTEM
 * Vanilla Pay simulated flow + order creation
 * Depends on main.js (EMP)
 */

(() => {

  // =========================
  // 📦 GET SELECTED PRODUCT
  // =========================
  function getSelectedProduct() {
    return JSON.parse(localStorage.getItem("selectedProduct"));
  }

  // =========================
  // ⚙️ GET CONFIG (VANILLA PAY)
  // =========================
  function getConfig() {
    return EMP.Config.get();
  }

  // =========================
  // 🧾 RENDER CHECKOUT PAGE
  // =========================
  function renderCheckout(containerId = "checkoutContainer") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const product = getSelectedProduct();
    const config = getConfig();

    if (!product) {
      container.innerHTML = "<p>Aucun produit sélectionné</p>";
      return;
    }

    container.innerHTML = `
      <div style="background:rgba(17,24,39,0.55);padding:20px;border-radius:18px;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(12px);">

        <h2>💳 Checkout sécurisé</h2>

        <div style="margin-top:15px;">
          <h3>${product.name}</h3>
          <p style="color:#9CA3AF;">${product.category || ""}</p>
          <p style="font-weight:700;color:#A855F7;">${EMP.Utils.formatPrice(product.price)}</p>
        </div>

        <hr style="margin:15px 0;border:1px solid rgba(255,255,255,0.05);" />

        <h4>🏪 Vendeur</h4>
        <p>${config.sellerName}</p>

        <h4 style="margin-top:10px;">💳 Vanilla Pay</h4>
        <p>Nom: ${config.vpName || "-"}</p>
        <p>Numéro: ${config.vpNumber || "-"}</p>

        <hr style="margin:15px 0;border:1px solid rgba(255,255,255,0.05);" />

        <h4>👤 Informations client</h4>

        <input id="customerName" placeholder="Nom complet" style="width:100%;padding:10px;margin:5px 0;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.3);color:white;">
        <input id="customerEmail" placeholder="Email" style="width:100%;padding:10px;margin:5px 0;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.3);color:white;">
        <input id="transactionId" placeholder="ID transaction Vanilla Pay" style="width:100%;padding:10px;margin:5px 0;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.3);color:white;">

        <button onclick="EMPCheckout.processPayment()"
          style="margin-top:15px;width:100%;padding:12px;border:none;border-radius:12px;
          background:linear-gradient(90deg,#8B5CF6,#A855F7);color:white;font-weight:700;cursor:pointer;">
          ✔ Paiement effectué
        </button>

      </div>
    `;
  }

  // =========================
  // 💾 PROCESS PAYMENT
  // =========================
  function processPayment() {

    const product = getSelectedProduct();
    if (!product) {
      EMP.Utils.notify("❌ Aucun produit");
      return;
    }

    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const tx = document.getElementById("transactionId").value;

    if (!name || !email || !tx) {
      EMP.Utils.notify("⚠️ Champs incomplets");
      return;
    }

    // 🧾 CREATE ORDER
    const order = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      customer: name,
      email: email,
      transactionId: tx,
      status: "validé",
      date: new Date().toLocaleDateString()
    };

    EMP.Orders.add(order);

    // 💾 SAVE LAST ORDER
    localStorage.setItem("lastOrder", JSON.stringify(order));

    EMP.Utils.notify("✅ Paiement validé");

    // ⏳ REDIRECT FLOW
    setTimeout(() => {
      window.location.href = "confirmation.html";
    }, 1500);
  }

  // =========================
  // ⏳ CONFIRMATION SIMULATION
  // =========================
  function startConfirmationFlow() {
    const container = document.getElementById("confirmationBox");
    if (!container) return;

    let progress = 0;

    const interval = setInterval(() => {
      progress += 20;
      container.innerHTML = `
        <div style="color:#A855F7;font-weight:700;">
          Vérification paiement... ${progress}%
        </div>
      `;

      if (progress >= 100) {
        clearInterval(interval);
        window.location.href = "download.html";
      }
    }, 1000);
  }

  // =========================
  // 🌐 EXPORT GLOBAL
  // =========================
  window.EMPCheckout = {
    renderCheckout,
    processPayment,
    startConfirmationFlow
  };

})();
