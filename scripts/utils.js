/* =========================================================
   ÉDIT MARKET PRO — GLOBAL UTILITIES
   Helpers globaux utilisés dans tout le site
   ========================================================= */

const Utils = {

  /* ---------------------------
     FORMAT PRICE
  ----------------------------*/
  formatPrice(price) {
    if (!price) return "0 Ar";

    return Number(price).toLocaleString("fr-FR") + " Ar";
  },

  formatCurrency(price, currency = "Ar") {
    return Number(price).toLocaleString("fr-FR") + " " + currency;
  },

  /* ---------------------------
     DATE & TIME
  ----------------------------*/
  formatDate(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  },

  formatDateTime(date) {
    return new Date(date).toLocaleString("fr-FR");
  },

  /* ---------------------------
     GENERATE IDS
  ----------------------------*/
  generateId(prefix = "EMP") {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  },

  /* ---------------------------
     URL PARAMS
  ----------------------------*/
  getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },

  /* ---------------------------
     REDIRECT
  ----------------------------*/
  redirect(url, delay = 0) {
    setTimeout(() => {
      window.location.href = url;
    }, delay);
  },

  /* ---------------------------
     VALIDATION
  ----------------------------*/
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  validatePhone(phone) {
    const regex = /^[0-9+\s()-]{6,20}$/;
    return regex.test(phone);
  },

  validateRequired(value) {
    return value !== null &&
           value !== undefined &&
           value.toString().trim() !== "";
  },

  /* ---------------------------
     STRING HELPERS
  ----------------------------*/
  slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  },

  capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  truncate(text, length = 100) {
    if (!text) return "";
    return text.length > length
      ? text.substring(0, length) + "..."
      : text;
  },

  /* ---------------------------
     TOAST NOTIFICATION
  ----------------------------*/
  showToast(message, duration = 3000) {

    const toast = document.createElement("div");

    toast.className = "emp-toast";

    toast.innerHTML = `
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");

      setTimeout(() => {
        toast.remove();
      }, 300);

    }, duration);
  },

  /* ---------------------------
     LOADING
  ----------------------------*/
  showLoader() {

    const loader = document.createElement("div");

    loader.id = "emp-loader";

    loader.innerHTML = `
      <div class="emp-loader-box">
        <div class="emp-spinner"></div>
        <p>Chargement...</p>
      </div>
    `;

    document.body.appendChild(loader);
  },

  hideLoader() {
    const loader = document.getElementById("emp-loader");

    if (loader) {
      loader.remove();
    }
  },

  /* ---------------------------
     SCROLL
  ----------------------------*/
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },

  /* ---------------------------
     COPY TEXT
  ----------------------------*/
  async copy(text) {

    try {
      await navigator.clipboard.writeText(text);

      this.showToast("Copié dans le presse-papiers");

      return true;

    } catch (error) {

      console.error(error);

      return false;
    }
  },

  /* ---------------------------
     STORAGE HELPERS
  ----------------------------*/
  getCurrentUser() {
    const session = Storage.getSession();

    if (!session) return null;

    return session.user;
  },

  isLoggedIn() {
    return Storage.isLoggedIn();
  },

  logout() {
    Storage.clearSession();
    this.redirect("login.html");
  },

  /* ---------------------------
     PRODUCT HELPERS
  ----------------------------*/
  calculateDiscount(price, promoPrice) {

    if (!promoPrice || promoPrice >= price) {
      return 0;
    }

    return Math.round(
      ((price - promoPrice) / price) * 100
    );
  },

  /* ---------------------------
     RANDOM
  ----------------------------*/
  random(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
  }

};

/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

window.Utils = Utils;
