const notificationTitle =
    document.getElementById(
        "notificationTitle"
    );

const notificationMessage =
    document.getElementById(
        "notificationMessage"
    );

const sendNotification =
    document.getElementById(
        "sendNotification"
    );

const notificationsList =
    document.getElementById(
        "notificationsList"
    );

function getNotifications() {

    return JSON.parse(
        localStorage.getItem(
            "editmarket_notifications"
        )
    ) || [];
}

function saveNotifications(
    notifications
) {

    localStorage.setItem(
        "editmarket_notifications",
        JSON.stringify(
            notifications
        )
    );
}

function renderNotifications() {

    const notifications =
        getNotifications();

    if (!notifications.length) {

        notificationsList.innerHTML = `
            <div class="empty-notifications">
                Aucune notification publiée
            </div>
        `;

        return;
    }

    notificationsList.innerHTML =
        notifications
        .slice()
        .reverse()
        .map(notification => {

            return `
                <div class="notification-item">

                    <strong>
                        ${notification.title}
                    </strong>

                    <br><br>

                    ${notification.message}

                    <br><br>

                    <small>
                        ${notification.date}
                    </small>

                </div>
            `;
        })
        .join("");
}

function createNotification() {

    const title =
        notificationTitle.value.trim();

    const message =
        notificationMessage.value.trim();

    if (!title || !message) {

        alert(
            "Veuillez remplir tous les champs."
        );

        return;
    }

    const notifications =
        getNotifications();

    notifications.push({
        title,
        message,
        date:
            new Date()
            .toLocaleString("fr-FR")
    });

    saveNotifications(
        notifications
    );

    notificationTitle.value = "";
    notificationMessage.value = "";

    renderNotifications();
}

sendNotification.addEventListener(
    "click",
    createNotification
);

renderNotifications();
