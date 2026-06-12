const adminName =
    document.getElementById(
        "adminName"
    );

const adminEmail =
    document.getElementById(
        "adminEmail"
    );

const adminBio =
    document.getElementById(
        "adminBio"
    );

const saveProfile =
    document.getElementById(
        "saveProfile"
    );

const successMessage =
    document.getElementById(
        "successMessage"
    );

function loadProfile() {

    const profile =
        JSON.parse(
            localStorage.getItem(
                "editmarket_profile"
            )
        ) || {};

    adminName.value =
        profile.name || "";

    adminEmail.value =
        profile.email || "";

    adminBio.value =
        profile.bio || "";
}

function saveAdminProfile() {

    const profile = {
        name: adminName.value.trim(),
        email: adminEmail.value.trim(),
        bio: adminBio.value.trim()
    };

    localStorage.setItem(
        "editmarket_profile",
        JSON.stringify(profile)
    );

    successMessage.style.display =
        "block";

    setTimeout(() => {

        successMessage.style.display =
            "none";

    }, 3000);
}

saveProfile.addEventListener(
    "click",
    saveAdminProfile
);

loadProfile();
