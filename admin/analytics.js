const totalVisits = document.getElementById("totalVisits");
const productViews = document.getElementById("productViews");
const downloadsCount = document.getElementById("downloadsCount");
const conversionRate = document.getElementById("conversionRate");
const logsContainer = document.getElementById("logsContainer");

const analytics =
    JSON.parse(
        localStorage.getItem("editmarket_analytics")
    ) || {};

const logs =
    JSON.parse(
        localStorage.getItem("editmarket_logs")
    ) || [];

function formatNumber(value) {

    return Number(
        value || 0
    ).toLocaleString("fr-FR");
}

function loadAnalytics() {

    const visits =
        analytics.visits || 0;

    const views =
        analytics.productViews || 0;

    const downloads =
        analytics.downloads || 0;

    const conversions =
        visits > 0
            ? ((downloads / visits) * 100).toFixed(1)
            : 0;

    totalVisits.textContent =
        formatNumber(visits);

    productViews.textContent =
        formatNumber(views);

    downloadsCount.textContent =
        formatNumber(downloads);

    conversionRate.textContent =
        `${conversions}%`;
}

function loadLogs() {

    if (!logs.length) {

        logsContainer.innerHTML = `
            <div class="log-item">
                Aucun événement enregistré
            </div>
        `;

        return;
    }

    logsContainer.innerHTML = logs
        .slice()
        .reverse()
        .map(log => {

            return `
                <div class="log-item">
                    ${log}
                </div>
            `;
        })
        .join("");
}

loadAnalytics();
loadLogs();
