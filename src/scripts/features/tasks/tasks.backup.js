// =============================
// Tasks Backup
// File: features/tasks/tasks.backup.js
// =============================

import { BACKUP_FILE_PREFIX } from "./tasks.constants.js";
import { normalizeImportedTasks } from "./tasks.model.js";

export function exportTasksBackup(tasks) {
  const backup = {
    app: "Agenda Escolar",
    version: "1.2",
    exportedAt: new Date().toISOString(),
    tasks,
  };

  const backupContent = JSON.stringify(backup, null, 2);
  const blob = new Blob([backupContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `${BACKUP_FILE_PREFIX}-${date}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

export function readImportedTasksFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      try {
        const parsedBackup = JSON.parse(reader.result);
        const importedTasks = normalizeImportedTasks(parsedBackup);

        resolve(importedTasks);
      } catch (error) {
        reject(error);
      }
    });

    reader.addEventListener("error", () => {
      reject(new Error("Ocorreu um erro ao ler o arquivo de backup."));
    });

    reader.readAsText(file);
  });
}

export function getImportSummaryText(taskCount) {
  return `O arquivo possui ${taskCount} atividade${taskCount > 1 ? "s" : ""}. Deseja importar esse backup agora?`;
}
