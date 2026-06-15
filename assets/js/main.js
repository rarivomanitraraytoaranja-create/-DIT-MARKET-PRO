/**
 * 🚀 ÉDIT MARKET PRO — MAIN ENGINE
 * Core system (localStorage + helpers + global state)
 * No backend, fully frontend SaaS logic
 */

(() => {

  // =========================
  // 🔐 GLOBAL STATE KEYS
  // =========================
  const KEYS = {
    USER: "userSession",
    USERS: "registeredUsers",
    PRODUCTS: "products",
    ORDERS: "orders",
    WISHLIST: "wishlist",
    CONFIG: "config"
  };

  // =========================
  // 💾 STORAGE HELPERS
  // =========================
  const Storage = {
    get(key, fallback = []) {
      try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
      } catch {
        return fallback;
      }
    },

    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    push(key, item) {
      const data = Storage.get(key, []);
      data.push(item);
      Storage.set(key, data);
    },

    update(key, index, newItem) {
      const data = Storage.get(key, []);
      data[index] = newItem;
      Storage.set(key, data);
    },

    remove(key, index) {
      const data = Storage.get(key, []);
      data.splice(index, 1);
      Storage.set(key, data);
    },

    clear(key) {
      localStorage.removeItem(key);
    }
  };

  // =========================
  // 👤 USER SYSTEM
  // =========================
  const User = {
    get() {
      return Storage.get(KEYS.USER, null);
    },

    set(user) {
      Storage.set(KEYS.USER, user);
    },

    logout() {
      localStorage.removeItem(KEYS.USER);
      window.location.href = "login.html";
    },

    isLogged() {
      return !!Storage.get(KEYS.USER, null);
    }
  };

  // =========================
  // 📦 PRODUCTS SYSTEM
  // =========================
  const Products = {
    all() {
      return Storage.get(KEYS.PRODUCTS, []);
    },

    add(product) {
      product.id = Date.now();
      product.createdAt = new Date().toISOString();
      Storage.push(KEYS.PRODUCTS, product);
    },

    update(index, product) {
      Storage.update(KEYS.PRODUCTS, index, product);
    },

    delete(index) {
      Storage.remove(KEYS.PRODUCTS, index);
    },

    find(id) {
      return Products.all().find(p => p.id === id);
    }
  };

  // =========================
  // 🛒 ORDERS SYSTEM
  // =========================
  const Orders = {
    all() {
      return Storage.get(KEYS.ORDERS, []);
    },

    add(order) {
      order.id = Date.now();
      order.date = new Date().toISOString();
      order.status = order.status || "validé";
      Storage.push(KEYS.ORDERS, order);
    },

    totalRevenue() {
      return Orders.all().reduce((sum, o) => sum + Number(o.price || 0), 0);
    }
  };

  // =========================
  // ❤️ WISHLIST SYSTEM
  // =========================
  const Wishlist = {
    all() {
      return Storage.get(KEYS.WISHLIST, []);
    },

    add(product) {
      const list = Wishlist.all();
      const exists = list.find(p => p.id === product.id);
      if (!exists) {
        list.push(product);
        Storage.set(KEYS.WISHLIST, list);
      }
    },

    remove(id) {
      const list = Wishlist.all().filter(p => p.id !== id);
      Storage.set(KEYS.WISHLIST, list);
    }
  };

  // =========================
  // ⚙️ CONFIG SYSTEM
  // =========================
  const Config = {
    get() {
      return Storage.get(KEYS.CONFIG, {
        sellerName: "ÉDIT MARKET PRO",
        currency: "EUR"
      });
    },

    set(config) {
      Storage.set(KEYS.CONFIG, config);
    }
  };

  // =========================
  // 🎯 GLOBAL HELPERS
  // =========================
  const Utils = {
    formatPrice(value) {
      return `${Number(value).toFixed(2)} €`;
    },

    notify(message) {
      const div = document.createElement("div");
      div.textContent = message;
      div.style.position = "fixed";
      div.style.bottom = "20px";
      div.style.right = "20px";
      div.style.background = "rgba(139,92,246,0.9)";
      div.style.color = "#fff";
      div.style.padding = "12px 16px";
      div.style.borderRadius = "12px";
      div.style.zIndex = "9999";
      div.style.backdropFilter = "blur(10px)";
      document.body.appendChild(div);

      setTimeout(() => div.remove(), 2500);
    }
  };

  // =========================
  // 🌐 GLOBAL EXPORT
  // =========================
  window.EMP = {
    Storage,
    User,
    Products,
    Orders,
    Wishlist,
    Config,
    Utils
  };

})();
