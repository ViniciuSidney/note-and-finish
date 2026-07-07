// =============================
// Tasks Controller
// File: features/tasks/tasks.controller.js
// =============================

import { loadCollapsedGroupKeys, loadTasks, saveCollapsedGroupKeys as persistCollapsedGroupKeys, saveTasks as persistTasks } from "./tasks.storage.js";
import { createId } from "./tasks.utils.js";
import { createDetailsHtml } from "./tasks.ui.js";
import { exportTasksBackup, getImportSummaryText, readImportedTasksFile } from "./tasks.backup.js";
import { closeClearAllDialog as closeClearAllDialogUi, closeDialog, closeOptionsMenu as closeOptionsMenuUi, isClearAllConfirmationValid, openClearAllDialog as openClearAllDialogUi, openCreateTaskDialog as openCreateTaskDialogUi, openDialog, openImportDialog, toggleOptionsMenu as toggleOptionsMenuUi, updateClearAllConfirmation } from "./tasks.dialogs.js";
import { initializeTheme as initializeAppTheme, toggleTheme as toggleAppTheme } from "./tasks.theme.js";
import { createInlineEditController } from "./tasks.inline-edit.js";
import { createTasksRenderer } from "./tasks.render.js";

const taskForm = document.querySelector("#taskForm");
const taskIdInput = document.querySelector("#taskId");
const titleInput = document.querySelector("#title");
const typeInput = document.querySelector("#type");
const subjectInput = document.querySelector("#subject");
const dueDateInput = document.querySelector("#dueDate");
const priorityInput = document.querySelector("#priority");
const statusInput = document.querySelector("#status");
const descriptionInput = document.querySelector("#description");
const subtasksInput = document.querySelector("#subtasks");
const tagsInput = document.querySelector("#tags");

const formTitle = document.querySelector("#formTitle");
const submitButton = document.querySelector("#submitButton");
const clearButton = document.querySelector("#clearButton");
const formMessage = document.querySelector("#formMessage");

const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const typeFilter = document.querySelector("#typeFilter");
const sortFilter = document.querySelector("#sortFilter");

const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");

const totalTasks = document.querySelector("#totalTasks");
const pendingTasks = document.querySelector("#pendingTasks");
const weekTasks = document.querySelector("#weekTasks");
const completedTasks = document.querySelector("#completedTasks");

const detailsDialog = document.querySelector("#detailsDialog");
const detailsTitle = document.querySelector("#detailsTitle");
const detailsBody = document.querySelector("#detailsBody");
const closeDetailsButton = document.querySelector("#closeDetailsButton");

const deleteDialog = document.querySelector("#deleteDialog");
const cancelDeleteButton = document.querySelector("#cancelDeleteButton");
const cancelDeleteTopButton = document.querySelector("#cancelDeleteTopButton");
const confirmDeleteButton = document.querySelector("#confirmDeleteButton");
const optionsButton = document.querySelector("#optionsButton");
const optionsDropdown = document.querySelector("#optionsDropdown");
const themeToggleButton = document.querySelector("#themeToggleButton");
const themeIcon = document.querySelector("#themeIcon");
const themeText = document.querySelector("#themeText");

const exportBackupButton = document.querySelector("#exportBackupButton");
const importBackupButton = document.querySelector("#importBackupButton");
const importFileInput = document.querySelector("#importFileInput");

const importDialog = document.querySelector("#importDialog");
const importSummary = document.querySelector("#importSummary");
const cancelImportButton = document.querySelector("#cancelImportButton");
const cancelImportTopButton = document.querySelector("#cancelImportTopButton");
const confirmImportButton = document.querySelector("#confirmImportButton");

const clearAllButton = document.querySelector("#clearAllButton");
const clearAllDialog = document.querySelector("#clearAllDialog");
const clearAllConfirmInput = document.querySelector("#clearAllConfirmInput");
const clearAllMessage = document.querySelector("#clearAllMessage");
const cancelClearAllButton = document.querySelector("#cancelClearAllButton");
const cancelClearAllTopButton = document.querySelector("#cancelClearAllTopButton");
const confirmClearAllButton = document.querySelector("#confirmClearAllButton");
const filtersToggleButton = document.querySelector("#filtersToggleButton");
const filtersPanel = document.querySelector("#filtersPanel");

const createTaskDialog = document.querySelector("#createTaskDialog");
const openTaskFormButton = document.querySelector("#openTaskFormButton");
const emptyCreateTaskButton = document.querySelector("#emptyCreateTaskButton");
const closeTaskFormButton = document.querySelector("#closeTaskFormButton");

let tasks = loadTasks();
let taskIdToDelete = null;
let pendingImportedTasks = null;
let collapsedGroupKeys = loadCollapsedGroupKeys();
let expandedChecklistTaskIds = new Set();

function saveTasks() {
  persistTasks(tasks);
}

function saveCollapsedGroupKeys() {
  persistCollapsedGroupKeys(collapsedGroupKeys);
}

const inlineEdit = createInlineEditController({
  getTasks: () => tasks,
  setTasks: (nextTasks) => {
    tasks = nextTasks;
  },
  saveTasks,
  render,
});

const renderer = createTasksRenderer({
  elements: {
    taskList,
    emptyState,
    totalTasks,
    pendingTasks,
    weekTasks,
    completedTasks,
    searchInput,
    statusFilter,
    typeFilter,
    sortFilter,
  },
  getTasks: () => tasks,
  getCollapsedGroupKeys: () => collapsedGroupKeys,
  getExpandedChecklistTaskIds: () => expandedChecklistTaskIds,
  getInlineEditState: inlineEdit.getState,
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
  render();

  taskForm.addEventListener("submit", handleSubmit);
  clearButton.addEventListener("click", resetForm);

  searchInput.addEventListener("input", render);
  statusFilter.addEventListener("change", render);
  typeFilter.addEventListener("change", render);
  sortFilter.addEventListener("change", render);
  filtersToggleButton.addEventListener("click", toggleFiltersPanel);

  taskList.addEventListener("click", handleTaskAction);
  taskList.addEventListener("keydown", inlineEdit.handleInlineEditorKeydown);
  taskList.addEventListener("focusout", inlineEdit.handleInlineEditorFocusOut);
  taskList.addEventListener("change", inlineEdit.handleInlineEditorChange);

  detailsBody.addEventListener("click", handleDetailsAction);

  closeDetailsButton.addEventListener("click", () => detailsDialog.close());

  cancelDeleteButton.addEventListener("click", closeDeleteDialog);
  cancelDeleteTopButton.addEventListener("click", closeDeleteDialog);
  confirmDeleteButton.addEventListener("click", deleteSelectedTask);
  optionsButton.addEventListener("click", toggleOptionsMenu);
  themeToggleButton.addEventListener("click", toggleTheme);
  exportBackupButton.addEventListener("click", exportBackup);
  importBackupButton.addEventListener("click", openImportFilePicker);
  importFileInput.addEventListener("change", handleImportFile);
  clearAllButton.addEventListener("click", openClearAllDialog);

  cancelImportButton.addEventListener("click", closeImportDialog);
  cancelImportTopButton.addEventListener("click", closeImportDialog);
  confirmImportButton.addEventListener("click", confirmImportBackup);

  cancelClearAllButton.addEventListener("click", closeClearAllDialog);
  cancelClearAllTopButton.addEventListener("click", closeClearAllDialog);
  confirmClearAllButton.addEventListener("click", clearAllTasks);
  clearAllConfirmInput.addEventListener("input", validateClearAllConfirmation);

  openTaskFormButton.addEventListener("click", openCreateTaskDialog);
  emptyCreateTaskButton.addEventListener("click", openCreateTaskDialog);
  closeTaskFormButton.addEventListener("click", closeCreateTaskDialog);

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = event.target.closest(".options-menu");

    if (!clickedInsideMenu) {
      closeOptionsMenu();
    }

    const clickedInsideInlineEdit = event.target.closest(".inline-edit-control");

    if (!clickedInsideInlineEdit) {
      inlineEdit.clearInlineEditAndRender();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOptionsMenu();
      inlineEdit.clearInlineEditAndRender();
    }
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

function exportBackup() {
  exportTasksBackup(tasks);

  closeOptionsMenu();
  showFormMessage("Backup exportado com sucesso.", "success");
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
      showFormMessage("O arquivo não possui atividades válidas para importar.", "error");
      return;
    }

    pendingImportedTasks = importedTasks;
    openImportDialog(getImportDialogElements(), getImportSummaryText(importedTasks.length));
  } catch {
    showFormMessage("Não foi possível importar o arquivo. Verifique se ele é um backup JSON válido.", "error");
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

  showFormMessage("Backup importado com sucesso.", "success");
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
    return;
  }

  tasks = [];

  saveTasks();
  resetForm();
  render();
  closeClearAllDialog();

  showFormMessage("Todas as atividades foram apagadas.", "success");
}

function closeClearAllDialog() {
  closeClearAllDialogUi(getClearAllDialogElements());
}

function handleSubmit(event) {
  event.preventDefault();

  const taskData = getFormData();

  if (!taskData.title || !taskData.dueDate) {
    showFormMessage("Preencha pelo menos o título e a data de entrega.", "error");
    return;
  }

  const editingId = taskIdInput.value;

  if (editingId) {
    tasks = tasks.map((task) => {
      if (task.id !== editingId) {
        return task;
      }

      return {
        ...task,
        ...taskData,
        updatedAt: new Date().toISOString(),
      };
    });

    showFormMessage("Atividade atualizada com sucesso.", "success");
  } else {
    const newTask = {
      id: createId(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);

    showFormMessage("Atividade cadastrada com sucesso.", "success");
  }

  saveTasks();
  resetForm(false);
  render();

  if (createTaskDialog.open) {
    closeCreateTaskDialog();
  }
}

function getFormData() {
  const existingTask = tasks.find((task) => task.id === taskIdInput.value);

  return {
    title: titleInput.value.trim(),
    type: typeInput.value,
    subject: subjectInput.value.trim(),
    dueDate: dueDateInput.value,
    priority: priorityInput.value,
    status: statusInput.value,
    description: descriptionInput.value.trim(),
    subtasks: getSubtasksFromInput(existingTask ? existingTask.subtasks : []),
    tags: tagsInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };
}

function getSubtasksFromInput(existingSubtasks = []) {
  const existingSubtasksByTitle = new Map(existingSubtasks.map((subtask) => [subtask.title.trim().toLowerCase(), subtask]));

  return subtasksInput.value
    .split("\n")
    .map((subtask) => subtask.trim())
    .filter(Boolean)
    .map((title) => {
      const existingSubtask = existingSubtasksByTitle.get(title.toLowerCase());

      return {
        id: existingSubtask ? existingSubtask.id : createId(),
        title,
        done: existingSubtask ? existingSubtask.done : false,
      };
    });
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
    toggleGroup(button.dataset.groupKey);
    return;
  }

  if (action === "toggle-checklist-preview") {
    toggleChecklistPreview(taskId);
    return;
  }

  if (action === "toggle-subtask") {
    toggleSubtask(taskId, button.dataset.subtaskId);
    return;
  }

  if (action === "view") {
    openDetails(taskId);
  }

  if (action === "edit") {
    editTask(taskId);
  }

  if (action === "delete") {
    openDeleteDialog(taskId);
  }

  if (action === "toggle") {
    toggleTaskStatus(taskId);
  }
}

function handleDetailsAction(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const taskId = button.dataset.id;

  if (action === "toggle-subtask") {
    toggleSubtask(taskId, button.dataset.subtaskId, true);
    return;
  }

  if (action === "details-toggle-status") {
    toggleTaskStatus(taskId);
    openDetails(taskId);
    return;
  }

  if (action === "details-delete") {
    detailsDialog.close();
    openDeleteDialog(taskId);
  }
}

function toggleSubtask(taskId, subtaskId, shouldRefreshDetails = false) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      subtasks: (task.subtasks || []).map((subtask) => {
        if (subtask.id !== subtaskId) {
          return subtask;
        }

        return {
          ...subtask,
          done: !subtask.done,
        };
      }),
      updatedAt: new Date().toISOString(),
    };
  });

  saveTasks();
  render();

  if (shouldRefreshDetails && detailsDialog.open) {
    openDetails(taskId);
  }
}

function toggleFiltersPanel() {
  const isExpanded = filtersPanel.classList.contains("filters-collapsed");

  filtersPanel.classList.toggle("filters-collapsed", !isExpanded);
  filtersToggleButton.setAttribute("aria-expanded", String(isExpanded));
  filtersToggleButton.textContent = isExpanded ? "🔎 Ocultar filtros" : "🔎 Filtros";
}

function toggleGroup(groupKey) {
  if (!groupKey) {
    return;
  }

  if (collapsedGroupKeys.has(groupKey)) {
    collapsedGroupKeys.delete(groupKey);
  } else {
    collapsedGroupKeys.add(groupKey);
  }

  saveCollapsedGroupKeys();
  render();
}

function toggleChecklistPreview(taskId) {
  if (!taskId) {
    return;
  }

  if (expandedChecklistTaskIds.has(taskId)) {
    expandedChecklistTaskIds.delete(taskId);
  } else {
    expandedChecklistTaskIds.add(taskId);
  }

  render();
}

function openDetails(taskId) {
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  const details = createDetailsHtml(task);

  detailsTitle.textContent = details.title;
  detailsBody.innerHTML = details.bodyHtml;

  if (!detailsDialog.open) {
    detailsDialog.showModal();
  }
}

function editTask(taskId) {
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  taskIdInput.value = task.id;
  titleInput.value = task.title;
  typeInput.value = task.type;
  subjectInput.value = task.subject;
  dueDateInput.value = task.dueDate;
  priorityInput.value = task.priority;
  statusInput.value = task.status;
  descriptionInput.value = task.description;
  subtasksInput.value = (task.subtasks || []).map((subtask) => subtask.title).join("\n");
  tagsInput.value = task.tags.join(", ");

  formTitle.textContent = "Editar atividade";
  submitButton.textContent = "Atualizar atividade";

  showFormMessage("Editando atividade selecionada.", "success");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function openDeleteDialog(taskId) {
  taskIdToDelete = taskId;
  openDialog(deleteDialog);
}

function closeDeleteDialog() {
  taskIdToDelete = null;
  closeDialog(deleteDialog);
}

function deleteSelectedTask() {
  if (!taskIdToDelete) {
    return;
  }

  tasks = tasks.filter((task) => task.id !== taskIdToDelete);

  saveTasks();
  render();
  resetForm(false);
  closeDeleteDialog();
}

function toggleTaskStatus(taskId) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    const nextStatus = task.status === "Concluída" ? "Pendente" : "Concluída";

    return {
      ...task,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    };
  });

  saveTasks();
  render();
}

function render() {
  renderer.render();
}

function resetForm(clearMessage = true) {
  taskForm.reset();

  taskIdInput.value = "";
  priorityInput.value = "Média";
  statusInput.value = "Pendente";

  formTitle.textContent = "Nova atividade";
  submitButton.textContent = "Salvar atividade";

  if (clearMessage) {
    showFormMessage("", "");
  }
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type || ""}`;
}

