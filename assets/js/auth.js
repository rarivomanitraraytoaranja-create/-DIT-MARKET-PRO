 /**
 * 🔐 ÉDIT MARKET PRO — AUTH SYSTEM
 * Login / Register / Google mock / Session
 * Depends on main.js (EMP core)
 */

(() => {

  // =========================
  // 🔐 REGISTER USER
  // =========================
  function register(name, email, password) {
    if (!name || !email || !password) {
      EMP.Utils.notify("⚠️ Tous les champs sont obligatoires");
      return false;
    }

    const users = EMP.Storage.get("registeredUsers", []);

    const exists = users.find(u => u.email === email);
    if (exists) {
      EMP.Utils.notify("❌ Email déjà utilisé");
      return false;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      type: "client",
      date: new Date().toLocaleDateString()
    };

    users.push(newUser);
    EMP.Storage.set("registeredUsers", users);

    EMP.Utils.notify("✅ Compte créé avec succès");
    return true;
  }

  // =========================
  // 🔑 LOGIN USER
  // =========================
  function login(email, password) {
    const users = EMP.Storage.get("registeredUsers", []);

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      EMP.Utils.notify("❌ Identifiants incorrects");
      return false;
    }

    EMP.User.set({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type
    });

    EMP.Utils.notify("👋 Bienvenue " + user.name);
    return true;
  }

  // =========================
  // 🔵 GOOGLE MOCK LOGIN
  // =========================
  function loginWithGoogle() {
    const fakeUser = {
      id: Date.now(),
      name: "Google User",
      email: "googleuser@gmail.com",
      type: "client"
    };

    EMP.User.set(fakeUser);

    const users = EMP.Storage.get("registeredUsers", []);
    users.push(fakeUser);
    EMP.Storage.set("registeredUsers", users);

    EMP.Utils.notify("🔵 Connecté avec Google");
  }

  // =========================
  // 🚪 LOGOUT
  // =========================
  function logout() {
    EMP.User.logout();
    EMP.Utils.notify("👋 Déconnexion réussie");
  }

  // =========================
  // 🔐 GUARD (PROTECTION PAGES)
  // =========================
  function requireAuth() {
    if (!EMP.User.isLogged()) {
      EMP.Utils.notify("🔒 Veuillez vous connecter");
      window.location.href = "login.html";
    }
  }

  // =========================
  // 🧠 CURRENT USER
  // =========================
  function getCurrentUser() {
    return EMP.User.get();
  }

  // =========================
  // 🌐 EXPORT GLOBAL
  // =========================
  window.EMPAuth = {
    register,
    login,
    loginWithGoogle,
    logout,
    requireAuth,
    getCurrentUser
  };

})();
