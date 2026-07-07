// =============================
// Tasks DOM
// File: features/tasks/tasks.dom.js
// =============================

export function getTaskElements(root = document) {
  return {
    rootDocument: root,

    taskForm: root.querySelector("#taskForm"),
    taskIdInput: root.querySelector("#taskId"),
    titleInput: root.querySelector("#title"),
    typeInput: root.querySelector("#type"),
    subjectInput: root.querySelector("#subject"),
    dueDateInput: root.querySelector("#dueDate"),
    priorityInput: root.querySelector("#priority"),
    statusInput: root.querySelector("#status"),
    descriptionInput: root.querySelector("#description"),
    subtasksInput: root.querySelector("#subtasks"),
    tagsInput: root.querySelector("#tags"),

    formTitle: root.querySelector("#formTitle"),
    submitButton: root.querySelector("#submitButton"),
    clearButton: root.querySelector("#clearButton"),
    formMessage: root.querySelector("#formMessage"),

    searchInput: root.querySelector("#searchInput"),
    statusFilter: root.querySelector("#statusFilter"),
    typeFilter: root.querySelector("#typeFilter"),
    sortFilter: root.querySelector("#sortFilter"),

    taskList: root.querySelector("#taskList"),
    emptyState: root.querySelector("#emptyState"),

    totalTasks: root.querySelector("#totalTasks"),
    pendingTasks: root.querySelector("#pendingTasks"),
    weekTasks: root.querySelector("#weekTasks"),
    completedTasks: root.querySelector("#completedTasks"),

    detailsDialog: root.querySelector("#detailsDialog"),
    detailsTitle: root.querySelector("#detailsTitle"),
    detailsBody: root.querySelector("#detailsBody"),
    closeDetailsButton: root.querySelector("#closeDetailsButton"),

    deleteDialog: root.querySelector("#deleteDialog"),
    cancelDeleteButton: root.querySelector("#cancelDeleteButton"),
    cancelDeleteTopButton: root.querySelector("#cancelDeleteTopButton"),
    confirmDeleteButton: root.querySelector("#confirmDeleteButton"),

    optionsButton: root.querySelector("#optionsButton"),
    optionsDropdown: root.querySelector("#optionsDropdown"),
    themeToggleButton: root.querySelector("#themeToggleButton"),
    themeIcon: root.querySelector("#themeIcon"),
    themeText: root.querySelector("#themeText"),

    exportBackupButton: root.querySelector("#exportBackupButton"),
    importBackupButton: root.querySelector("#importBackupButton"),
    importFileInput: root.querySelector("#importFileInput"),

    importDialog: root.querySelector("#importDialog"),
    importSummary: root.querySelector("#importSummary"),
    cancelImportButton: root.querySelector("#cancelImportButton"),
    cancelImportTopButton: root.querySelector("#cancelImportTopButton"),
    confirmImportButton: root.querySelector("#confirmImportButton"),

    clearAllButton: root.querySelector("#clearAllButton"),
    clearAllDialog: root.querySelector("#clearAllDialog"),
    clearAllConfirmInput: root.querySelector("#clearAllConfirmInput"),
    clearAllMessage: root.querySelector("#clearAllMessage"),
    cancelClearAllButton: root.querySelector("#cancelClearAllButton"),
    cancelClearAllTopButton: root.querySelector("#cancelClearAllTopButton"),
    confirmClearAllButton: root.querySelector("#confirmClearAllButton"),

    filtersToggleButton: root.querySelector("#filtersToggleButton"),
    filtersPanel: root.querySelector("#filtersPanel"),

    createTaskDialog: root.querySelector("#createTaskDialog"),
    openTaskFormButton: root.querySelector("#openTaskFormButton"),
    emptyCreateTaskButton: root.querySelector("#emptyCreateTaskButton"),
    closeTaskFormButton: root.querySelector("#closeTaskFormButton"),
  };
}
