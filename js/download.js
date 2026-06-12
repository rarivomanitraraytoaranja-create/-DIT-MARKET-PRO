// ===============================
// ÉDIT MARKET PRO - TÉLÉCHARGEMENT SÉCURISÉ
// ===============================

// simulation lien sécurisé après paiement
function generateDownloadLink(orderId){

    let orders = JSON.parse(localStorage.getItem("edit_orders")) || [];

    let order = orders.find(o => o.id === orderId);

    if(!order || order.status !== "paid"){
        alert("Accès refusé ❌");
        return;
    }

    let link = "https://download.editmarketpro.com/file/" + orderId;

    alert("Lien de téléchargement : " + link);

    return link;
}

// ===============================
// ACCÈS TÉLÉCHARGEMENT APRÈS PAIEMENT
// ===============================
function accessDownload(){

    let orders = JSON.parse(localStorage.getItem("edit_orders")) || [];

    let lastOrder = orders[orders.length - 1];

    if(!lastOrder){
        alert("Aucune commande trouvée");
        return;
    }

    if(lastOrder.status !== "paid"){
        alert("Paiement requis ❌");
        return;
    }

    let link = "https://download.editmarketpro.com/file/" + lastOrder.id;

    window.location.href = link;
}
