const adminPassword =
    document.getElementById("adminPassword");

const savePassword =
    document.getElementById("savePassword");

const successMessage =
    document.getElementById("successMessage");

function saveAdminPassword() {

    const password =
        adminPassword.value.trim();

    if (!password) {

        alert(
            "Veuillez saisir un mot de passe."
        );

        return;
    }

    localStorage.setItem(
        "editmarket_admin_password",
        password
    );

    adminPassword.value = "";

    successMessage.style.display =
        "block";

    setTimeout(() => {

        successMessage.style.display =
            "none";

    }, 3000);
}

savePassword.addEventListener(
    "click",
    saveAdminPassword
);
