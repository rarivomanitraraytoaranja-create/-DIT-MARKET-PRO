/**
 * 🎬 ÉDIT MARKET PRO — PRODUCT PAGE SYSTEM
 * Product detail logic + buy flow + wishlist
 * Depends on main.js (EMP)
 */

(() => {

  // =========================
  // 📦 GET SELECTED PRODUCT
  // =========================
  function getProduct() {
    return JSON.parse(localStorage.getItem("selectedProduct"));
  }

  // =========================
  // 🎯 RENDER PRODUCT PAGE
  // =========================
  function renderProduct(containerId = "productContainer") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const product = getProduct();

    if (!product) {
      container.innerHTML = `
        <p style="color:#9CA3AF;">Aucun produit sélectionné</p>
      `;
      return;
    }

    container.innerHTML = `
      <div style="
        background:rgba(17,24,39,0.55);
        border:1px solid rgba(255,255,255,0.08);
        border-radius:18px;
        padding:20px;
        backdrop-filter:blur(12px);
      ">

        <img src="${product.image || 'assets/img/products/placeholder.png'}"
             style="width:100%;height:280px;object-fit:cover;border-radius:14px;" />

        <h2 style="margin-top:15px;">${product.name}</h2>

        <p style="color:#9CA3AF;margin-top:5px;">
          ${product.category || "Non classé"}
        </p>

        <p style="margin-top:10px;font-size:18px;font-weight:700;color:#A855F7;">
          ${EMP.Utils.formatPrice(product.price || 0)}
        </p>

        <p style="margin-top:10px;color:#ccc;font-size:14px;line-height:1.4;">
          ${product.desc || "Aucune description disponible"}
        </p>

        <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">

          <button onclick="EMPProduct.buyNow()"
            style="
              flex:1;
              padding:12px;
              border:none;
              border-radius:12px;
              background:linear-gradient(90deg,#8B5CF6,#A855F7);
              color:white;
              font-weight:700;
              cursor:pointer;
            ">
            🛒 Acheter
          </button>

          <button onclick="EMPProduct.addToWishlist()"
            style="
              padding:12px 14px;
              border:none;
              border-radius:12px;
              background:rgba(255,255,255,0.1);
              color:white;
              cursor:pointer;
            ">
            ❤️ Wishlist
          </button>

        </div>

      </div>
    `;
  }

  // =========================
  // 🛒 BUY NOW FLOW
  // =========================
  function buyNow() {
    const product = getProduct();

    if (!product) {
      EMP.Utils.notify("❌ Produit introuvable");
      return;
    }

    localStorage.setItem("selectedProduct", JSON.stringify(product));

    EMP.Utils.notify("💳 Redirection checkout...");
    setTimeout(() => {
      window.location.href = "checkout.html";
    }, 1000);
  }

  // =========================
  // ❤️ ADD TO WISHLIST
  // =========================
  function addToWishlist() {
    const product = getProduct();

    if (!product) return;

    EMP.Wishlist.add(product);
    EMP.Utils.notify("❤️ Ajouté aux favoris");
  }

  // =========================
  // 🔗 INIT PAGE
  // =========================
  function init() {
    renderProduct();
  }

  // =========================
  // 🌐 EXPORT GLOBAL
  // =========================
  window.EMPProduct = {
    renderProduct,
    buyNow,
    addToWishlist,
    init
  };

  // auto init
  document.addEventListener("DOMContentLoaded", init);

})();
