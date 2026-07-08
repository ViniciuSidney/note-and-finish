// =============================
// Tasks Events
// File: features/tasks/tasks.events.js
// =============================

function addEvent(element, eventName, handler) {
  if (!element || !handler) {
    return;
  }

  element.addEventListener(eventName, handler);
}

export function bindTaskEvents({ elements, handlers, inlineEdit, taskActions }) {
  const {
    rootDocument,
    taskForm,
    clearButton,
    dueDateInput,
    dueDateShortcuts,
    searchInput,
    statusFilter,
    typeFilter,
    sortFilter,
    filtersToggleButton,
    taskList,
    detailsBody,
    closeDetailsButton,
    cancelDeleteButton,
    cancelDeleteTopButton,
    confirmDeleteButton,
    optionsButton,
    themeToggleButton,
    exportBackupButton,
    importBackupButton,
    importFileInput,
    clearAllButton,
    cancelImportButton,
    cancelImportTopButton,
    confirmImportButton,
    cancelClearAllButton,
    cancelClearAllTopButton,
    confirmClearAllButton,
    clearAllConfirmInput,
    openTaskFormButton,
    emptyCreateTaskButton,
    closeTaskFormButton,
  } = elements;

  const documentRef = rootDocument || document;

  addEvent(taskForm, "submit", handlers.handleSubmit);
  addEvent(clearButton, "click", () => handlers.resetForm());
  addEvent(dueDateShortcuts, "click", handlers.handleDueDateShortcut);
  addEvent(dueDateInput, "input", handlers.syncDueDateShortcutState);
  addEvent(dueDateInput, "change", handlers.syncDueDateShortcutState);

  addEvent(searchInput, "input", handlers.render);
  addEvent(statusFilter, "change", handlers.render);
  addEvent(typeFilter, "change", handlers.render);
  addEvent(sortFilter, "change", handlers.render);
  addEvent(filtersToggleButton, "click", handlers.toggleFiltersPanel);

  addEvent(taskList, "click", handlers.handleTaskAction);
  addEvent(taskList, "submit", handlers.handleSubtaskComposerSubmit);
  addEvent(taskList, "keydown", inlineEdit.handleInlineEditorKeydown);
  addEvent(taskList, "focusout", inlineEdit.handleInlineEditorFocusOut);
  addEvent(taskList, "change", inlineEdit.handleInlineEditorChange);

  addEvent(detailsBody, "click", taskActions.handleDetailsAction);
  addEvent(detailsBody, "submit", handlers.handleSubtaskComposerSubmit);
  addEvent(closeDetailsButton, "click", handlers.closeDetailsDialog);

  addEvent(cancelDeleteButton, "click", taskActions.closeDeleteDialog);
  addEvent(cancelDeleteTopButton, "click", taskActions.closeDeleteDialog);
  addEvent(confirmDeleteButton, "click", taskActions.deleteSelectedTask);

  addEvent(optionsButton, "click", handlers.toggleOptionsMenu);
  addEvent(themeToggleButton, "click", handlers.toggleTheme);
  addEvent(exportBackupButton, "click", handlers.exportBackup);
  addEvent(importBackupButton, "click", handlers.openImportFilePicker);
  addEvent(importFileInput, "change", handlers.handleImportFile);
  addEvent(clearAllButton, "click", handlers.openClearAllDialog);

  addEvent(cancelImportButton, "click", handlers.closeImportDialog);
  addEvent(cancelImportTopButton, "click", handlers.closeImportDialog);
  addEvent(confirmImportButton, "click", handlers.confirmImportBackup);

  addEvent(cancelClearAllButton, "click", handlers.closeClearAllDialog);
  addEvent(cancelClearAllTopButton, "click", handlers.closeClearAllDialog);
  addEvent(confirmClearAllButton, "click", handlers.clearAllTasks);
  addEvent(clearAllConfirmInput, "input", handlers.validateClearAllConfirmation);

  addEvent(openTaskFormButton, "click", handlers.openCreateTaskDialog);
  addEvent(emptyCreateTaskButton, "click", handlers.openCreateTaskDialog);
  addEvent(closeTaskFormButton, "click", handlers.closeCreateTaskDialog);

  addEvent(documentRef, "click", (event) => {
    const clickedInsideMenu = event.target.closest(".options-menu");

    if (!clickedInsideMenu) {
      handlers.closeOptionsMenu();
    }

    const clickedInsideInlineEdit = event.target.closest(".inline-edit-control");

    if (!clickedInsideInlineEdit) {
      inlineEdit.clearInlineEditAndRender();
    }
  });

  addEvent(documentRef, "keydown", (event) => {
    if (event.key === "Escape") {
      handlers.closeOptionsMenu();
      inlineEdit.clearInlineEditAndRender();
      handlers.closeSubtaskComposer?.();
    }
  });
}
