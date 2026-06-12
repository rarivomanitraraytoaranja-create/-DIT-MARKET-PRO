// ===============================
// ÉDIT MARKET PRO - DOWNLOAD SECURITY (FULL FILE)
// ===============================

function getDeviceId(){
    let id = localStorage.getItem("device_id");

    if(!id){
        id = "DEV-" + Math.random().toString(36).substring(2) + Date.now();
        localStorage.setItem("device_id", id);
    }

    return id;
}

function registerPurchaseDevice(orderId){

    let devices = JSON.parse(localStorage.getItem("edit_devices")) || {};

    let deviceId = getDeviceId();

    devices[orderId] = deviceId;

    localStorage.setItem("edit_devices", JSON.stringify(devices));
}

function canDownload(orderId){

    let orders = JSON.parse(localStorage.getItem("edit_orders")) || [];
    let devices = JSON.parse(localStorage.getItem("edit_devices")) || {};

    let order = orders.find(o => o.id === orderId);

    if(!order){
        return false;
    }

    if(order.status !== "paid"){
        return false;
    }

    let deviceId = getDeviceId();

    if(devices[orderId] && devices[orderId] !== deviceId){
        return false;
    }

    return true;
}

function secureDownload(orderId){

    if(!canDownload(orderId)){
        alert("Accès refusé ❌");
        return;
    }

    let link = "https://download.editmarketpro.com/file/" + orderId;

    window.location.href = link;
}
