// ===============================
// ÉDIT MARKET PRO - ANALYTICS SYSTEM
// ===============================

// tracker global
let analytics = JSON.parse(localStorage.getItem("edit_analytics")) || {
    visits: 0,
    productViews: 0,
    cartAdds: 0,
    purchases: 0
};

// ===============================
// VISITE PAGE
// ===============================
function trackVisit(){
    analytics.visits += 1;
    saveAnalytics();
}

// ===============================
// VUE PRODUIT
// ===============================
function trackProductView(){
    analytics.productViews += 1;
    saveAnalytics();
}

// ===============================
// AJOUT PANIER
// ===============================
function trackAddToCart(){
    analytics.cartAdds += 1;
    saveAnalytics();
}

// ===============================
// ACHAT
// ===============================
function trackPurchase(){
    analytics.purchases += 1;
    saveAnalytics();
}

// ===============================
// SAUVEGARDE
// ===============================
function saveAnalytics(){
    localStorage.setItem("edit_analytics", JSON.stringify(analytics));
}

// ===============================
// RECUPERER DATA
// ===============================
function getAnalytics(){
    return analytics;
}
