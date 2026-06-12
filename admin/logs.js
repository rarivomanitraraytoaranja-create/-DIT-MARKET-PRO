const logsList =
    document.getElementById("logsList");

const refreshLogs =
    document.getElementById("refreshLogs");

const clearLogs =
    document.getElementById("clearLogs");

function loadLogs() {

    const logs =
        JSON.parse(
            localStorage.getItem(
                "editmarket_logs"
            )
        ) || [];

    if (!logs.length) {

        logsList.innerHTML = `
            <div class="empty-logs">
                Aucun journal disponible
            </div>
        `;

        return;
    }

    logsList.innerHTML = logs
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

function clearAllLogs() {

    const confirmation =
        confirm(
            "Supprimer tous les journaux ?"
        );

    if (!confirmation) {
        return;
    }

    localStorage.removeItem(
        "editmarket_logs"
    );

    loadLogs();
}

refreshLogs.addEventListener(
    "click",
    loadLogs
);

clearLogs.addEventListener(
    "click",
    clearAllLogs
);

loadLogs();
