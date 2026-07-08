// =============================
// Tasks Controller
// File: features/tasks/tasks.controller.js
// =============================

import { loadCollapsedGroupKeys, loadTasks, saveCollapsedGroupKeys as persistCollapsedGroupKeys, saveTasks as persistTasks } from "./tasks.storage.js";
import { exportTasksBackup, getImportSummaryText, readImportedTasksFile } from "./tasks.backup.js";
import {
  closeClearAllDialog as closeClearAllDialogUi,
  closeCreateTaskDialog as closeCreateTaskDialogUi,
  closeDialog,
  closeOptionsMenu as closeOptionsMenuUi,
  isClearAllConfirmationValid,
  openClearAllDialog as openClearAllDialogUi,
  openCreateTaskDialog as openCreateTaskDialogUi,
  openDialog,
  openImportDialog,
  toggleOptionsMenu as toggleOptionsMenuUi,
  updateClearAllConfirmation,
} from "./tasks.dialogs.js";
import { initializeTheme as initializeAppTheme, toggleTheme as toggleAppTheme } from "./tasks.theme.js";
import { createInlineEditController } from "./tasks.inline-edit.js";
import { createTasksRenderer } from "./tasks.render.js";
import { createTaskActionsController } from "./tasks.actions.js";
import { getTaskElements } from "./tasks.dom.js";
import { bindTaskEvents } from "./tasks.events.js";
import { createTaskFormController } from "./tasks.form.js";
import { createToastController } from "./tasks.toast.js";

const elements = getTaskElements();

const {
  taskForm,
  taskIdInput,
  titleInput,
  typeInput,
  subjectInput,
  dueDateInput,
  dueDateShortcuts,
  priorityInput,
  statusInput,
  descriptionInput,
  subtasksInput,
  tagsInput,
  formTitle,
  submitButton,
  formMessage,
  searchInput,
  statusFilter,
  typeFilter,
  sortFilter,
  taskList,
  emptyState,
  totalTasks,
  pendingTasks,
  weekTasks,
  completedTasks,
  todayFocusPanel,
  todayFocusTitle,
  todayFocusMessage,
  todayFocusOverdueCount,
  todayFocusTodayCount,
  todayFocusHighCount,
  detailsDialog,
  detailsTitle,
  detailsBody,
  deleteDialog,
  optionsButton,
  optionsDropdown,
  themeToggleButton,
  themeIcon,
  themeText,
  importFileInput,
  importDialog,
  importSummary,
  clearAllDialog,
  clearAllConfirmInput,
  clearAllMessage,
  confirmClearAllButton,
  filtersToggleButton,
  filtersPanel,
  createTaskDialog,
  toastContainer,
} = elements;

let tasks = loadTasks();
let pendingImportedTasks = null;
let collapsedGroupKeys = loadCollapsedGroupKeys();
let expandedChecklistTaskIds = new Set();

function saveTasks() {
  persistTasks(tasks);
}

function saveCollapsedGroupKeys() {
  persistCollapsedGroupKeys(collapsedGroupKeys);
}

const toast = createToastController({
  container: toastContainer,
});

const taskFormController = createTaskFormController({
  elements: {
    taskForm,
    taskIdInput,
    titleInput,
    typeInput,
    subjectInput,
    dueDateInput,
    dueDateShortcuts,
    priorityInput,
    statusInput,
    descriptionInput,
    subtasksInput,
    tagsInput,
    formTitle,
    submitButton,
    formMessage,
    createTaskDialog,
  },
  getTasks: () => tasks,
  setTasks: (nextTasks) => {
    tasks = nextTasks;
  },
  saveTasks,
  render,
  closeCreateTaskDialog,
  showToast,
});

const inlineEdit = createInlineEditController({
  getTasks: () => tasks,
  setTasks: (nextTasks) => {
    tasks = nextTasks;
  },
  saveTasks,
  render,
});

const taskActions = createTaskActionsController({
  elements: {
    detailsDialog,
    detailsTitle,
    detailsBody,
    deleteDialog,
    taskIdInput,
    titleInput,
    typeInput,
    subjectInput,
    dueDateInput,
    priorityInput,
    statusInput,
    descriptionInput,
    subtasksInput,
    tagsInput,
    formTitle,
    submitButton,
  },
  getTasks: () => tasks,
  setTasks: (nextTasks) => {
    tasks = nextTasks;
  },
  saveTasks,
  render,
  resetForm,
  showFormMessage,
  showToast,
  getCollapsedGroupKeys: () => collapsedGroupKeys,
  saveCollapsedGroupKeys,
  getExpandedChecklistTaskIds: () => expandedChecklistTaskIds,
  openDialog,
  closeDialog,
});

const renderer = createTasksRenderer({
  elements: {
    taskList,
    emptyState,
    totalTasks,
    pendingTasks,
    weekTasks,
    completedTasks,
    todayFocusPanel,
    todayFocusTitle,
    todayFocusMessage,
    todayFocusOverdueCount,
    todayFocusTodayCount,
    todayFocusHighCount,
    searchInput,
    statusFilter,
    typeFilter,
    sortFilter,
  },
  getTasks: () => tasks,
  getCollapsedGroupKeys: () => collapsedGroupKeys,
  getExpandedChecklistTaskIds: () => expandedChecklistTaskIds,
  getInlineEditState: inlineEdit.getState,
  getChecklistComposerTaskId: taskActions.getChecklistComposerTaskId,
});

function getThemeElements() {
  return {
    themeToggleButton,
    themeIcon,
    themeText,
  };
}

function getOptionsMenuElements() {
  return {
    optionsButton,
    optionsDropdown,
  };
}

function getCreateTaskDialogElements() {
  return {
    createTaskDialog,
    titleInput,
    formTitle,
    submitButton,
    resetForm,
  };
}

function getImportDialogElements() {
  return {
    importDialog,
    importSummary,
  };
}

function getClearAllDialogElements() {
  return {
    clearAllDialog,
    clearAllConfirmInput,
    clearAllMessage,
    confirmClearAllButton,
  };
}

let isInitialized = false;

export function initTasksFeature() {
  if (isInitialized) {
    return;
  }

  isInitialized = true;

  initializeTheme();
  taskFormController.initializeDateShortcuts();
  render();

  bindTaskEvents({
    elements,
    inlineEdit,
    taskActions,
    handlers: {
      handleSubmit: taskFormController.handleSubmit,
      handleDueDateShortcut: taskFormController.handleDueDateShortcut,
      syncDueDateShortcutState: taskFormController.syncDueDateShortcutState,
      resetForm,
      render,
      toggleFiltersPanel,
      handleTaskAction,
      handleSubtaskComposerSubmit,
      closeDetailsDialog,
      toggleOptionsMenu,
      toggleTheme,
      exportBackup,
      openImportFilePicker,
      handleImportFile,
      openClearAllDialog,
      closeImportDialog,
      confirmImportBackup,
      closeClearAllDialog,
      clearAllTasks,
      validateClearAllConfirmation,
      openCreateTaskDialog,
      closeCreateTaskDialog,
      closeOptionsMenu,
      closeSubtaskComposer: taskActions.closeSubtaskComposer,
    },
  });
}

function initializeTheme() {
  initializeAppTheme(getThemeElements());
}

function toggleTheme() {
  toggleAppTheme(getThemeElements());
  closeOptionsMenu();
}

function toggleOptionsMenu() {
  toggleOptionsMenuUi(getOptionsMenuElements());
}

function closeOptionsMenu() {
  closeOptionsMenuUi(getOptionsMenuElements());
}

function closeDetailsDialog() {
  closeDialog(detailsDialog);
}

function toggleFiltersPanel() {
  const isExpanded = filtersPanel.classList.contains("filters-collapsed");

  filtersPanel.classList.toggle("filters-collapsed", !isExpanded);
  filtersToggleButton.setAttribute("aria-expanded", String(isExpanded));
  filtersToggleButton.textContent = isExpanded ? "🔎 Ocultar filtros" : "🔎 Filtros";
}

function exportBackup() {
  exportTasksBackup(tasks);

  closeOptionsMenu();
  showToast("Backup exportado.", "success");
}

function openImportFilePicker() {
  closeOptionsMenu();
  importFileInput.click();
}

async function handleImportFile(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  try {
    const importedTasks = await readImportedTasksFile(file);

    if (!importedTasks.length) {
      showToast("O arquivo não possui atividades válidas para importar.", "error");
      return;
    }

    pendingImportedTasks = importedTasks;
    openImportDialog(getImportDialogElements(), getImportSummaryText(importedTasks.length));
  } catch {
    showToast("Não foi possível importar o arquivo. Verifique se ele é um backup JSON válido.", "error");
  } finally {
    importFileInput.value = "";
  }
}

function openCreateTaskDialog() {
  openCreateTaskDialogUi(getCreateTaskDialogElements());
}

function closeCreateTaskDialog() {
  closeCreateTaskDialogUi(getCreateTaskDialogElements());
}

function confirmImportBackup() {
  if (!pendingImportedTasks) {
    return;
  }

  tasks = pendingImportedTasks;
  pendingImportedTasks = null;

  saveTasks();
  resetForm();
  render();
  closeImportDialog();

  showToast("Backup importado com sucesso.", "success");
}

function closeImportDialog() {
  pendingImportedTasks = null;
  closeDialog(importDialog);
}

function openClearAllDialog() {
  closeOptionsMenu();
  openClearAllDialogUi(getClearAllDialogElements());
}

function validateClearAllConfirmation() {
  updateClearAllConfirmation(getClearAllDialogElements());
}

function clearAllTasks() {
  if (!isClearAllConfirmationValid(clearAllConfirmInput.value)) {
    clearAllMessage.textContent = "Digite APAGAR para confirmar.";
    clearAllMessage.className = "form-message error";
    showToast("Digite APAGAR para confirmar a exclusão total.", "error");
    return;
  }

  tasks = [];

  saveTasks();
  resetForm();
  render();
  closeClearAllDialog();

  showToast("Todas as atividades foram apagadas.", "success");
}

function closeClearAllDialog() {
  closeClearAllDialogUi(getClearAllDialogElements());
}


function handleTaskAction(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const taskId = button.dataset.id;
  const action = button.dataset.action;

  if (action === "open-inline-editor") {
    inlineEdit.openInlineEditor(taskId, button.dataset.field);
    return;
  }

  if (action === "open-inline-select") {
    inlineEdit.openInlineSelect(taskId, button.dataset.field);
    return;
  }

  if (action === "update-inline-select") {
    inlineEdit.updateInlineSelect(taskId, button.dataset.field, button.dataset.value);
    return;
  }

  if (action === "toggle-group") {
    taskActions.toggleGroup(button.dataset.groupKey);
    return;
  }

  if (action === "toggle-checklist-preview") {
    taskActions.toggleChecklistPreview(taskId);
    return;
  }

  if (action === "toggle-subtask") {
    taskActions.toggleSubtask(taskId, button.dataset.subtaskId);
    return;
  }

  if (action === "open-subtask-composer") {
    taskActions.openSubtaskComposer(taskId);
    return;
  }

  if (action === "cancel-subtask-composer") {
    taskActions.closeSubtaskComposer();
    return;
  }

  if (action === "quick-postpone") {
    taskActions.postponeTask(taskId, button.dataset.days);
    return;
  }

  if (action === "view") {
    taskActions.openDetails(taskId);
  }

  if (action === "edit") {
    taskActions.editTask(taskId);
  }

  if (action === "delete") {
    taskActions.openDeleteDialog(taskId);
  }

  if (action === "toggle") {
    taskActions.toggleTaskStatus(taskId);
  }
}


function handleSubtaskComposerSubmit(event) {
  const shouldRefreshDetails = Boolean(event.target.closest("#detailsBody"));
  taskActions.handleSubtaskComposerSubmit(event, shouldRefreshDetails);
}

function showToast(message, type = "info", options) {
  toast.showToast(message, type, options);
}

function render() {
  renderer.render();
}

function resetForm(clearMessage = true) {
  taskFormController.resetForm(clearMessage);
}

function showFormMessage(message, type) {
  taskFormController.showFormMessage(message, type);
}

