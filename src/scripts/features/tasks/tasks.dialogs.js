// =============================
// Tasks Dialogs
// File: features/tasks/tasks.dialogs.js
// =============================

export function toggleOptionsMenu(elements) {
  const { optionsButton, optionsDropdown } = elements;
  const isOpen = optionsDropdown.classList.toggle("is-open");

  optionsButton.setAttribute("aria-expanded", String(isOpen));
  optionsDropdown.setAttribute("aria-hidden", String(!isOpen));

  return isOpen;
}

export function closeOptionsMenu(elements) {
  const { optionsButton, optionsDropdown } = elements;

  optionsDropdown.classList.remove("is-open");
  optionsButton.setAttribute("aria-expanded", "false");
  optionsDropdown.setAttribute("aria-hidden", "true");
}

export function openDialog(dialog) {
  dialog.showModal();
}

export function closeDialog(dialog) {
  dialog.close();
}

export function openCreateTaskDialog(elements) {
  const { createTaskDialog, titleInput, formTitle, submitButton, resetForm } = elements;

  resetForm();

  formTitle.textContent = "Nova atividade";
  submitButton.textContent = "Salvar atividade";

  createTaskDialog.showModal();

  setTimeout(() => titleInput.focus(), 50);
}

export function closeCreateTaskDialog(elements) {
  const { createTaskDialog, resetForm } = elements;

  resetForm();
  createTaskDialog.close();
}

export function openImportDialog(elements, summaryText) {
  const { importDialog, importSummary } = elements;

  importSummary.textContent = summaryText;
  importDialog.showModal();
}

export function openClearAllDialog(elements) {
  const { clearAllDialog, clearAllConfirmInput, clearAllMessage, confirmClearAllButton } = elements;

  clearAllConfirmInput.value = "";
  clearAllMessage.textContent = "";
  clearAllMessage.className = "form-message";
  confirmClearAllButton.disabled = true;

  clearAllDialog.showModal();
  setTimeout(() => clearAllConfirmInput.focus(), 50);
}

export function isClearAllConfirmationValid(value) {
  return value.trim().toUpperCase() === "APAGAR";
}

export function updateClearAllConfirmation(elements) {
  const { clearAllConfirmInput, clearAllMessage, confirmClearAllButton } = elements;
  const canDelete = isClearAllConfirmationValid(clearAllConfirmInput.value);

  confirmClearAllButton.disabled = !canDelete;
  clearAllMessage.textContent = canDelete ? "Confirmação liberada." : "";
  clearAllMessage.className = `form-message ${canDelete ? "success" : ""}`;

  return canDelete;
}

export function closeClearAllDialog(elements) {
  const { clearAllDialog, clearAllConfirmInput, clearAllMessage, confirmClearAllButton } = elements;

  clearAllDialog.close();
  clearAllConfirmInput.value = "";
  clearAllMessage.textContent = "";
  confirmClearAllButton.disabled = true;
}
