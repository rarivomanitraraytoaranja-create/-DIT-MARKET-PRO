const customersTable = document.getElementById("customersTable");

const customers =
    JSON.parse(
        localStorage.getItem("editmarket_customers")
    ) || [];

function formatAmount(amount) {
    return Number(amount || 0).toLocaleString("fr-FR");
}

function renderCustomers() {

    if (!customers.length) {

        customersTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty-customers">
                    Aucun client enregistré
                </td>
            </tr>
        `;

        return;
    }

    customersTable.innerHTML = customers
        .map(customer => {

            return `
                <tr>

                    <td>
                        ${customer.id || "-"}
                    </td>

                    <td>
                        ${customer.name || "-"}
                    </td>

                    <td>
                        ${customer.email || "-"}
                    </td>

                    <td>
                        ${customer.phone || "-"}
                    </td>

                    <td>
                        ${customer.orders || 0}
                    </td>

                    <td>
                        ${formatAmount(customer.spent)} Ar
                    </td>

                </tr>
            `;
        })
        .join("");
}

renderCustomers();
