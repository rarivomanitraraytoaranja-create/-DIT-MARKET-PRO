const messagesList = document.getElementById("messagesList");

const messages =
    JSON.parse(
        localStorage.getItem("editmarket_messages")
    ) || [];

function formatDate(dateString) {

    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function renderMessages() {

    if (!messages.length) {

        messagesList.innerHTML = `
            <div class="empty-messages">
                Aucun message reçu
            </div>
        `;

        return;
    }

    messagesList.innerHTML = messages
        .slice()
        .reverse()
        .map(message => {

            return `
                <div class="message-card">

                    <div class="message-header">

                        <div>
                            <div class="message-name">
                                ${message.name || "Inconnu"}
                            </div>

                            <div class="message-email">
                                ${message.email || "-"}
                            </div>
                        </div>

                        <div class="message-date">
                            ${formatDate(message.date)}
                        </div>

                    </div>

                    <div class="message-content">
                        ${message.message || ""}
                    </div>

                </div>
            `;
        })
        .join("");
}

renderMessages();
