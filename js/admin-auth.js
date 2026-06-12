// ==========================
// ADMIN AUTH SYSTEM SIMPLE
// ==========================

// Vérifie si admin connecté
function checkAuth() {
    if (localStorage.getItem("auth") !== "true") {
        window.location.href = "admin/login.html";
    }
}

// Déconnexion admin
function logout() {
    localStorage.removeItem("auth");
    window.location.href = "admin/login.html";
}

// Login admin (utilisé si tu veux déplacer la logique ici)
function loginAdmin(username, password) {
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "1234";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("auth", "true");
        return true;
    }

    return false;
}
