const paymentsTable = document.getElementById("paymentsTable");

const payments =
    JSON.parse(
        localStorage.getItem("editmarket_payments")
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

function formatAmount(amount) {

    return Number(
        amount || 0
    ).toLocaleString("fr-FR");
}

function getStatusClass(status) {

    switch (status) {

        case "success":
            return "success";

        case "failed":
            return "failed";

        default:
            return "pending";
    }
}

function getStatusLabel(status) {

    switch (status) {

        case "success":
            return "Validé";

        case "failed":
            return "Refusé";

        default:
            return "En attente";
    }
}

function renderPayments() {

    if (!payments.length) {

        paymentsTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty-payments">
                    Aucun paiement enregistré
                </td>
            </tr>
        `;

        return;
    }

    paymentsTable.innerHTML = payments
        .map(payment => {

            return `
                <tr>

                    <td>
                        ${payment.id || "-"}
                    </td>

                    <td>
                        ${payment.customer || "-"}
                    </td>

                    <td>
                        ${payment.product || "-"}
                    </td>

                    <td>
                        ${formatAmount(payment.amount)} Ar
                    </td>

                    <td>
                        <span class="status ${getStatusClass(payment.status)}">
                            ${getStatusLabel(payment.status)}
                        </span>
                    </td>

                    <td>
                        ${formatDate(payment.date)}
                    </td>

                </tr>
            `;
        })
        .join("");
}

renderPayments();
