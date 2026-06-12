const siteName = document.getElementById("siteName");
const siteDescription = document.getElementById("siteDescription");
const siteEmail = document.getElementById("siteEmail");
const saveSettings = document.getElementById("saveSettings");
const successMessage = document.getElementById("successMessage");

const defaultSettings = {
    siteName: "ÉDIT MARKET PRO",
    siteDescription: "Marketplace de produits numériques",
    siteEmail: ""
};

function loadSettings() {

    const settings =
        JSON.parse(
            localStorage.getItem("editmarket_settings")
        ) || defaultSettings;

    siteName.value = settings.siteName || "";
    siteDescription.value = settings.siteDescription || "";
    siteEmail.value = settings.siteEmail || "";
}

function saveSiteSettings() {

    const settings = {
        siteName: siteName.value.trim(),
        siteDescription: siteDescription.value.trim(),
        siteEmail: siteEmail.value.trim()
    };

    localStorage.setItem(
        "editmarket_settings",
        JSON.stringify(settings)
    );

    successMessage.style.display = "block";

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000);
}

saveSettings.addEventListener(
    "click",
    saveSiteSettings
);

loadSettings();
