const productsReport =
    document.getElementById(
        "productsReport"
    );

const ordersReport =
    document.getElementById(
        "ordersReport"
    );

const paymentsReport =
    document.getElementById(
        "paymentsReport"
    );

function downloadReport(
    filename,
    content
) {

    const blob = new Blob(
        [content],
        {
            type: "text/plain"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

function generateProductsReport() {

    const products =
        JSON.parse(
            localStorage.getItem(
                "editmarket_products"
            )
        ) || [];

    let report =
`RAPPORT PRODUITS
====================

Nombre de produits : ${products.length}

`;

    products.forEach(
        (product, index) => {

        report +=
`#${index + 1}
Nom : ${product.name || ""}
Catégorie : ${product.category || ""}
Prix : ${product.price || 0} Ar

`;
    });

    downloadReport(
        "rapport-produits.txt",
        report
    );
}

function generateOrdersReport() {

    const orders =
        JSON.parse(
            localStorage.getItem(
                "editmarket_orders"
            )
        ) || [];

    let report =
`RAPPORT COMMANDES
====================

Nombre de commandes : ${orders.length}

`;

    orders.forEach(
        (order, index) => {

        report +=
`#${index + 1}
ID : ${order.id || ""}
Produit : ${order.product || ""}
Client : ${order.customer || ""}
Montant : ${order.amount || 0} Ar

`;
    });

    downloadReport(
        "rapport-commandes.txt",
        report
    );
}

function generatePaymentsReport() {

    const payments =
        JSON.parse(
            localStorage.getItem(
                "editmarket_payments"
            )
        ) || [];

    let report =
`RAPPORT PAIEMENTS
====================

Nombre de paiements : ${payments.length}

`;

    payments.forEach(
        (payment, index) => {

        report +=
`#${index + 1}
ID : ${payment.id || ""}
Client : ${payment.customer || ""}
Produit : ${payment.product || ""}
Montant : ${payment.amount || 0} Ar
Statut : ${payment.status || ""}

`;
    });

    downloadReport(
        "rapport-paiements.txt",
        report
    );
}

productsReport.addEventListener(
    "click",
    generateProductsReport
);

ordersReport.addEventListener(
    "click",
    generateOrdersReport
);

paymentsReport.addEventListener(
    "click",
    generatePaymentsReport
);
