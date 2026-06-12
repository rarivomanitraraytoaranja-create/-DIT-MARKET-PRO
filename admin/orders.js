const ordersTable = document.getElementById("ordersTable");

const orders =
    JSON.parse(
        localStorage.getItem("editmarket_orders")
    ) || [];

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function getStatusClass(status) {

    switch (status) {

        case "completed":
            return "completed";

        case "cancelled":
            return "cancelled";

        default:
            return "pending";
    }
}

function getStatusLabel(status) {

    switch (status) {

        case "completed":
            return "Payée";

        case "cancelled":
            return "Annulée";

        default:
            return "En attente";
    }
}

function renderOrders() {

    if (!orders.length) {

        ordersTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty-orders">
                    Aucune commande enregistrée
                </td>
            </tr>
        `;

        return;
    }

    ordersTable.innerHTML = orders
        .map(order => {

            return `
                <tr>

                    <td>
                        ${order.id}
                    </td>

                    <td>
                        ${order.product}
                    </td>

                    <td>
                        ${order.customer}
                    </td>

                    <td>
                        ${Number(order.amount).toLocaleString("fr-FR")} Ar
                    </td>

                    <td>
                        <span class="status ${getStatusClass(order.status)}">
                            ${getStatusLabel(order.status)}
                        </span>
                    </td>

                    <td>
                        ${formatDate(order.date)}
                    </td>

                </tr>
            `;
        })
        .join("");
}

renderOrders();
