/**
 * 📦 ÉDIT MARKET PRO — PRODUCTS SYSTEM
 * Catalog + filters + search + wishlist integration
 * Depends on main.js (EMP)
 */

(() => {

  // =========================
  // 📦 GET PRODUCTS
  // =========================
  function getProducts() {
    return EMP.Products.all();
  }

  // =========================
  // 🖼️ RENDER PRODUCTS GRID
  // =========================
  function renderProducts(containerId = "productsContainer") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const products = getProducts();
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = `<p style="color:#9CA3AF;">Aucun produit disponible</p>`;
      return;
    }

    products.forEach((p) => {
      const card = document.createElement("div");
      card.style.cssText = `
        background:rgba(17,24,39,0.55);
        border:1px solid rgba(255,255,255,0.08);
        border-radius:16px;
        padding:15px;
        backdrop-filter:blur(12px);
        transition:0.3s;
        cursor:pointer;
      `;

      card.onmouseenter = () => {
        card.style.transform = "translateY(-5px)";
        card.style.boxShadow = "0 0 25px rgba(139,92,246,0.25)";
      };

      card.onmouseleave = () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
      };

      card.innerHTML = `
        <img src="${p.image || 'assets/img/products/placeholder.png'}" 
             style="width:100%;height:140px;object-fit:cover;border-radius:12px;" />

        <h3 style="margin-top:10px;font-size:16px;">${p.name}</h3>

        <p style="color:#9CA3AF;font-size:12px;margin:5px 0;">
          ${p.category || "Non classé"}
        </p>

        <p style="font-weight:700;color:#A855F7;">
          ${EMP.Utils.formatPrice(p.price || 0)}
        </p>

        <div style="display:flex;gap:10px;margin-top:10px;">
          <button onclick="EMPProducts.openProduct(${p.id})"
            style="flex:1;padding:8px;border:none;border-radius:10px;
            background:linear-gradient(90deg,#8B5CF6,#A855F7);color:white;cursor:pointer;">
            Voir
          </button>

          <button onclick="EMPProducts.addToWishlist(${p.id})"
            style="padding:8px 10px;border:none;border-radius:10px;
            background:rgba(255,255,255,0.1);color:white;cursor:pointer;">
            ❤️
          </button>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // =========================
  // 🔍 SEARCH PRODUCTS
  // =========================
  function searchProducts(query) {
    const products = getProducts();

    return products.filter(p =>
      (p.name || "").toLowerCase().includes(query.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(query.toLowerCase())
    );
  }

  // =========================
  // 📂 FILTER BY CATEGORY
  // =========================
  function filterByCategory(category) {
    const products = getProducts();

    if (!category || category === "all") return products;

    return products.filter(p => p.category === category);
  }

  // =========================
  // ❤️ ADD TO WISHLIST
  // =========================
  function addToWishlist(productId) {
    const product = EMP.Products.find(productId);
    if (!product) return;

    EMP.Wishlist.add(product);
    EMP.Utils.notify("❤️ Ajouté aux favoris");
  }

  // =========================
  // 🛒 OPEN PRODUCT PAGE
  // =========================
  function openProduct(productId) {
    const product = EMP.Products.find(productId);
    if (!product) return;

    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
  }

  // =========================
  // 🔎 LIVE SEARCH INPUT
  // =========================
  function bindSearch(inputId, containerId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener("input", (e) => {
      const query = e.target.value;

      const filtered = searchProducts(query);

      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = "";

      filtered.forEach((p) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <div style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;">
            ${p.name} — <span style="color:#A855F7">${p.price} €</span>
          </div>
        `;

        div.onclick = () => openProduct(p.id);
        container.appendChild(div);
      });
    });
  }

  // =========================
  // 🌐 EXPORT GLOBAL
  // =========================
  window.EMPProducts = {
    renderProducts,
    searchProducts,
    filterByCategory,
    addToWishlist,
    openProduct,
    bindSearch
  };

})();
