/**
 * 🧠 ÉDIT MARKET PRO — ADMIN SYSTEM
 * Dashboard logic + protection + stats + controls
 * Depends on main.js (EMP)
 */

(() => {

  // =========================
  // 🔐 ADMIN PROTECTION
  // =========================
  function requireAdmin() {
    const user = EMP.User.get();

    if (!user) {
      EMP.Utils.notify("🔒 Accès admin refusé");
      window.location.href = "../login.html";
      return;
    }

    // simple rule: email admin (tu peux changer)
    const isAdmin =
      user.email.includes("admin") ||
      user.type === "admin";

    if (!isAdmin) {
      EMP.Utils.notify("⛔ Zone réservée admin");
      window.location.href = "../index.html";
    }
  }

  // =========================
  // 📊 GET STATS
  // =========================
  function getStats() {
    const products = EMP.Products.all();
    const orders = EMP.Orders.all();
    const users = EMP.Storage.get("registeredUsers", []);

    const revenue = orders.reduce((sum, o) => sum + Number(o.price || 0), 0);

    return {
      products: products.length,
      orders: orders.length,
      users: users.length,
      revenue
    };
  }

  // =========================
  // 📊 RENDER DASHBOARD STATS
  // =========================
  function renderDashboard() {

    const stats = getStats();

    const revenueEl = document.getElementById("revenue");
    const salesEl = document.getElementById("sales");
    const productsEl = document.getElementById("products");
    const usersEl = document.getElementById("users");

    if (revenueEl) revenueEl.innerText = stats.revenue + " €";
    if (salesEl) salesEl.innerText = stats.orders;
    if (productsEl) productsEl.innerText = stats.products;
    if (usersEl) usersEl.innerText = stats.users;
  }

  // =========================
  // 📦 PRODUCTS ADMIN ACTIONS
  // =========================
  function deleteProduct(id) {
    const products = EMP.Products.all();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return;

    EMP.Products.delete(index);
    EMP.Utils.notify("🗑️ Produit supprimé");

    location.reload();
  }

  function addProduct(product) {
    EMP.Products.add(product);
    EMP.Utils.notify("➕ Produit ajouté");
  }

  // =========================
  // 🛒 ORDERS MANAGEMENT
  // =========================
  function markOrderStatus(index, status) {
    const orders = EMP.Orders.all();

    if (!orders[index]) return;

    orders[index].status = status;
    EMP.Storage.set("orders", orders);

    EMP.Utils.notify("📦 Statut mis à jour");
  }

  // =========================
  // 👥 USERS OVERVIEW
  // =========================
  function getUsers() {
    return EMP.Storage.get("registeredUsers", []);
  }

  function getUserStats(email) {
    const orders = EMP.Orders.all();
    return orders.filter(o => o.email === email).length;
  }

  // =========================
  // 📈 SIMPLE LIVE REFRESH
  // =========================
  function startLiveStats() {
    renderDashboard();

    setInterval(() => {
      renderDashboard();
    }, 5000);
  }

  // =========================
  // 🚀 INIT ADMIN PAGE
  // =========================
  function init() {
    requireAdmin();
    startLiveStats();
  }

  // =========================
  // 🌐 EXPORT GLOBAL
  // =========================
  window.EMPAdmin = {
    requireAdmin,
    getStats,
    renderDashboard,
    deleteProduct,
    addProduct,
    markOrderStatus,
    getUsers,
    getUserStats,
    startLiveStats,
    init
  };

  // auto-init if admin page
  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("/admin/")) {
      init();
    }
  });

})();
