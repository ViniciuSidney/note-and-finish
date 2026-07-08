// =============================
// Tasks DOM
// File: features/tasks/tasks.dom.js
// =============================

const TASK_OPTIONAL_ELEMENT_SELECTORS = {
  toastContainer: "#toastContainer",
};

const TASK_ELEMENT_SELECTORS = {
  taskForm: "#taskForm",
  taskIdInput: "#taskId",
  titleInput: "#title",
  typeInput: "#type",
  subjectInput: "#subject",
  dueDateInput: "#dueDate",
  dueDateShortcuts: "#dueDateShortcuts",
  priorityInput: "#priority",
  statusInput: "#status",
  descriptionInput: "#description",
  subtasksInput: "#subtasks",
  tagsInput: "#tags",

  formTitle: "#formTitle",
  submitButton: "#submitButton",
  clearButton: "#clearButton",
  formMessage: "#formMessage",

  searchInput: "#searchInput",
  statusFilter: "#statusFilter",
  typeFilter: "#typeFilter",
  sortFilter: "#sortFilter",

  taskList: "#taskList",
  emptyState: "#emptyState",

  totalTasks: "#totalTasks",
  pendingTasks: "#pendingTasks",
  weekTasks: "#weekTasks",
  completedTasks: "#completedTasks",

  todayFocusPanel: "#todayFocusPanel",
  todayFocusTitle: "#todayFocusTitle",
  todayFocusMessage: "#todayFocusMessage",
  todayFocusOverdueCount: "#todayFocusOverdueCount",
  todayFocusTodayCount: "#todayFocusTodayCount",
  todayFocusHighCount: "#todayFocusHighCount",

  detailsDialog: "#detailsDialog",
  detailsTitle: "#detailsTitle",
  detailsBody: "#detailsBody",
  closeDetailsButton: "#closeDetailsButton",

  deleteDialog: "#deleteDialog",
  cancelDeleteButton: "#cancelDeleteButton",
  cancelDeleteTopButton: "#cancelDeleteTopButton",
  confirmDeleteButton: "#confirmDeleteButton",

  optionsButton: "#optionsButton",
  optionsDropdown: "#optionsDropdown",
  themeToggleButton: "#themeToggleButton",
  themeIcon: "#themeIcon",
  themeText: "#themeText",

  exportBackupButton: "#exportBackupButton",
  importBackupButton: "#importBackupButton",
  importFileInput: "#importFileInput",

  importDialog: "#importDialog",
  importSummary: "#importSummary",
  cancelImportButton: "#cancelImportButton",
  cancelImportTopButton: "#cancelImportTopButton",
  confirmImportButton: "#confirmImportButton",

  clearAllButton: "#clearAllButton",
  clearAllDialog: "#clearAllDialog",
  clearAllConfirmInput: "#clearAllConfirmInput",
  clearAllMessage: "#clearAllMessage",
  cancelClearAllButton: "#cancelClearAllButton",
  cancelClearAllTopButton: "#cancelClearAllTopButton",
  confirmClearAllButton: "#confirmClearAllButton",

  filtersToggleButton: "#filtersToggleButton",
  filtersPanel: "#filtersPanel",

  createTaskDialog: "#createTaskDialog",
  openTaskFormButton: "#openTaskFormButton",
  emptyCreateTaskButton: "#emptyCreateTaskButton",
  closeTaskFormButton: "#closeTaskFormButton",
};

function getOptionalElement(root, selector) {
  return root.querySelector(selector);
}

function getRequiredElement(root, key, selector) {
  const element = root.querySelector(selector);

  if (!element) {
    throw new Error(`[Tasks DOM] Elemento obrigatório não encontrado: ${key} (${selector})`);
  }

  return element;
}

export function getTaskElements(root = document) {
  const elements = {
    rootDocument: root,
  };

  Object.entries(TASK_ELEMENT_SELECTORS).forEach(([key, selector]) => {
    elements[key] = getRequiredElement(root, key, selector);
  });

  Object.entries(TASK_OPTIONAL_ELEMENT_SELECTORS).forEach(([key, selector]) => {
    elements[key] = getOptionalElement(root, selector);
  });

  return elements;
}
