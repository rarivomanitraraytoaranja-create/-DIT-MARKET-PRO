const exportBackup =
    document.getElementById("exportBackup");

const importBackup =
    document.getElementById("importBackup");

const backupInfo =
    document.getElementById("backupInfo");

function exportData() {

    const backup = {};

    for (let i = 0; i < localStorage.length; i++) {

        const key =
            localStorage.key(i);

        backup[key] =
            localStorage.getItem(key);
    }

    const blob = new Blob(
        [
            JSON.stringify(
                backup,
                null,
                2
            )
        ],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "edit-market-pro-backup.json";

    link.click();

    URL.revokeObjectURL(url);

    backupInfo.textContent =
        "Sauvegarde exportée avec succès.";
}

function importData(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function(e) {

        try {

            const backup =
                JSON.parse(
                    e.target.result
                );

            Object.keys(backup)
                .forEach(key => {

                    localStorage.setItem(
                        key,
                        backup[key]
                    );
                });

            backupInfo.textContent =
                "Sauvegarde restaurée avec succès.";

        } catch {

            backupInfo.textContent =
                "Fichier invalide.";
        }
    };

    reader.readAsText(file);
}

exportBackup.addEventListener(
    "click",
    exportData
);

importBackup.addEventListener(
    "change",
    importData
);
