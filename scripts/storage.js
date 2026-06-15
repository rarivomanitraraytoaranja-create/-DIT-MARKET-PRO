/* =========================================================
   ÉDIT MARKET PRO — STORAGE LAYER (SAAS CORE)
   Remplace localStorage brut + prépare JSON + extensible
   ========================================================= */

const Storage = {
  /* ---------------------------
     INIT KEYS
  ----------------------------*/
  keys: {
    users: "emp_users",
    session: "emp_session",
    cart: "emp_cart",
    wishlist: "emp_wishlist",
    orders: "emp_orders",
    config: "emp_config"
  },

  /* ---------------------------
     LOCAL STORAGE CORE
  ----------------------------*/
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Storage GET error:", key, e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error("Storage SET error:", key, e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  /* ---------------------------
     USERS
  ----------------------------*/
  getUsers() {
    return this.get(this.keys.users) || [];
  },

  saveUsers(users) {
    return this.set(this.keys.users, users);
  },

  addUser(user) {
    const users = this.getUsers();
    users.push(user);
    return this.saveUsers(users);
  },

  findUser(email) {
    const users = this.getUsers();
    return users.find(u => u.email === email);
  },

  /* ---------------------------
     SESSION (LOGIN)
  ----------------------------*/
  setSession(user) {
    return this.set(this.keys.session, {
      user,
      loginAt: Date.now()
    });
  },

  getSession() {
    return this.get(this.keys.session);
  },

  clearSession() {
    this.remove(this.keys.session);
  },

  isLoggedIn() {
    return !!this.getSession();
  },

  /* ---------------------------
     WISHLIST
  ----------------------------*/
  getWishlist() {
    return this.get(this.keys.wishlist) || [];
  },

  addToWishlist(product) {
    const list = this.getWishlist();
    const exists = list.find(p => p.id === product.id);
    if (!exists) {
      list.push(product);
      this.set(this.keys.wishlist, list);
    }
    return list;
  },

  removeFromWishlist(productId) {
    let list = this.getWishlist();
    list = list.filter(p => p.id !== productId);
    this.set(this.keys.wishlist, list);
    return list;
  },

  /* ---------------------------
     CART
----------------------------*/
  getCart() {
    return this.get(this.keys.cart) || [];
  },

  addToCart(product) {
    const cart = this.getCart();
    cart.push({
      ...product,
      addedAt: Date.now()
    });
    this.set(this.keys.cart, cart);
    return cart;
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(p => p.id !== productId);
    this.set(this.keys.cart, cart);
    return cart;
  },

  clearCart() {
    this.set(this.keys.cart, []);
  },

  /* ---------------------------
     ORDERS
  ----------------------------*/
  getOrders() {
    return this.get(this.keys.orders) || [];
  },

  addOrder(order) {
    const orders = this.getOrders();
    orders.push({
      ...order,
      id: "ORD-" + Date.now(),
      createdAt: Date.now()
    });
    this.set(this.keys.orders, orders);
    return orders;
  },

  /* ---------------------------
     CONFIG (VANILLA PAY + SITE)
  ----------------------------*/
  getConfig() {
    return this.get(this.keys.config) || {
      sellerName: "ÉDIT MARKET PRO",
      vanillaPayName: "",
      vanillaPayNumber: "",
      contactEmail: "",
      paymentMessage: ""
    };
  },

  setConfig(config) {
    return this.set(this.keys.config, config);
  },

  /* ---------------------------
     SYNC HELPERS (FUTURE JSON)
  ----------------------------*/
  async fetchJSON(path) {
    try {
      const res = await fetch(path);
      return await res.json();
    } catch (e) {
      console.error("Fetch JSON error:", path, e);
      return null;
    }
  },

  async getProductsData() {
    return await this.fetchJSON("data/products.json");
  },

  async getCategoriesData() {
    return await this.fetchJSON("data/categories.json");
  }
};

/* =========================================================
   EXPORT GLOBAL
   ========================================================= */
window.Storage = Storage;
