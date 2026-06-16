const STORAGE_KEY = "agenda-escolar-v1";
const THEME_STORAGE_KEY = "agenda-escolar-theme-v1";
const BACKUP_FILE_PREFIX = "agenda-escolar-backup";
const GROUP_COLLAPSE_STORAGE_KEY = "agenda-escolar-group-collapse-v1";
const INLINE_SELECT_OPTIONS = {
  type: ["Trabalho", "Avaliação", "Tarefa", "Apresentação", "Outro"],
  priority: ["Baixa", "Média", "Alta"],
  status: ["Pendente", "Em andamento", "Concluída"],
};

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

let tasks = loadTasks();
let taskIdToDelete = null;
let pendingImportedTasks = null;
let collapsedGroupKeys = loadCollapsedGroupKeys();
let expandedChecklistTaskIds = new Set();
let activeInlineSelect = null;
let activeInlineEditor = null;

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
taskList.addEventListener("keydown", handleInlineEditorKeydown);
taskList.addEventListener("focusout", handleInlineEditorFocusOut);
taskList.addEventListener("change", handleInlineEditorChange);

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

document.addEventListener("click", (event) => {
  const clickedInsideMenu = event.target.closest(".options-menu");

  if (!clickedInsideMenu) {
    closeOptionsMenu();
  }

  const clickedInsideInlineEdit = event.target.closest(".inline-edit-control");

  if (!clickedInsideInlineEdit && (activeInlineSelect || activeInlineEditor)) {
    activeInlineSelect = null;
    activeInlineEditor = null;
    render();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOptionsMenu();

    if (activeInlineSelect || activeInlineEditor) {
      activeInlineSelect = null;
      activeInlineEditor = null;
      render();
    }
  }
});

function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = savedTheme || (prefersDarkTheme ? "dark" : "light");

  applyTheme(initialTheme);
}

function applyTheme(theme) {
  const isDarkTheme = theme === "dark";

  document.body.dataset.theme = theme;

  themeIcon.textContent = isDarkTheme ? "☀️" : "🌙";
  themeText.textContent = isDarkTheme ? "Tema claro" : "Tema escuro";

  themeToggleButton.setAttribute("aria-label", isDarkTheme ? "Ativar tema claro" : "Ativar tema escuro");
}

function toggleTheme() {
  const currentTheme = document.body.dataset.theme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

  applyTheme(nextTheme);
  closeOptionsMenu();
}

function toggleOptionsMenu() {
  const isOpen = optionsDropdown.classList.toggle("is-open");

  optionsButton.setAttribute("aria-expanded", String(isOpen));
  optionsDropdown.setAttribute("aria-hidden", String(!isOpen));
}

function closeOptionsMenu() {
  optionsDropdown.classList.remove("is-open");
  optionsButton.setAttribute("aria-expanded", "false");
  optionsDropdown.setAttribute("aria-hidden", "true");
}

function exportBackup() {
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

  closeOptionsMenu();
  showFormMessage("Backup exportado com sucesso.", "success");
}

function openImportFilePicker() {
  closeOptionsMenu();
  importFileInput.click();
}

function handleImportFile(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const parsedBackup = JSON.parse(reader.result);
      const importedTasks = normalizeImportedTasks(parsedBackup);

      if (!importedTasks.length) {
        showFormMessage("O arquivo não possui atividades válidas para importar.", "error");
        return;
      }

      pendingImportedTasks = importedTasks;
      importSummary.textContent = `O arquivo possui ${importedTasks.length} atividade${importedTasks.length > 1 ? "s" : ""}. Deseja importar esse backup agora?`;
      importDialog.showModal();
    } catch {
      showFormMessage("Não foi possível importar o arquivo. Verifique se ele é um backup JSON válido.", "error");
    } finally {
      importFileInput.value = "";
    }
  });

  reader.addEventListener("error", () => {
    showFormMessage("Ocorreu um erro ao ler o arquivo de backup.", "error");
    importFileInput.value = "";
  });

  reader.readAsText(file);
}

function normalizeImportedTasks(backupData) {
  const rawTasks = Array.isArray(backupData) ? backupData : backupData.tasks;

  if (!Array.isArray(rawTasks)) {
    throw new Error("Formato de backup inválido.");
  }

  return rawTasks
    .map((task) => {
      const title = String(task.title || "").trim();
      const dueDate = String(task.dueDate || "").trim();

      if (!title || !dueDate) {
        return null;
      }

      return {
        id: task.id || createId(),
        title,
        type: normalizeOption(task.type, ["Trabalho", "Avaliação", "Tarefa", "Apresentação", "Outro"], "Outro"),
        subject: String(task.subject || "").trim(),
        dueDate,
        priority: normalizeOption(task.priority, ["Baixa", "Média", "Alta"], "Média"),
        status: normalizeOption(task.status, ["Pendente", "Em andamento", "Concluída"], "Pendente"),
        description: String(task.description || "").trim(),
        tags: normalizeTags(task.tags),
        subtasks: normalizeSubtasks(task.subtasks),
        createdAt: task.createdAt || new Date().toISOString(),
        updatedAt: task.updatedAt || new Date().toISOString(),
      };
    })
    .filter(Boolean);
}

function normalizeOption(value, validOptions, fallback) {
  return validOptions.includes(value) ? value : fallback;
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.map((tag) => String(tag).trim()).filter(Boolean);
}

function normalizeSubtasks(subtasks) {
  if (!Array.isArray(subtasks)) {
    return [];
  }

  return subtasks
    .map((subtask) => {
      const title = typeof subtask === "string" ? subtask.trim() : String(subtask.title || "").trim();

      if (!title) {
        return null;
      }

      return {
        id: subtask.id || createId(),
        title,
        done: Boolean(subtask.done),
      };
    })
    .filter(Boolean);
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
  importDialog.close();
}

function openClearAllDialog() {
  closeOptionsMenu();

  clearAllConfirmInput.value = "";
  clearAllMessage.textContent = "";
  clearAllMessage.className = "form-message";
  confirmClearAllButton.disabled = true;

  clearAllDialog.showModal();
  setTimeout(() => clearAllConfirmInput.focus(), 50);
}

function validateClearAllConfirmation() {
  const canDelete = clearAllConfirmInput.value.trim().toUpperCase() === "APAGAR";

  confirmClearAllButton.disabled = !canDelete;
  clearAllMessage.textContent = canDelete ? "Confirmação liberada." : "";
  clearAllMessage.className = `form-message ${canDelete ? "success" : ""}`;
}

function clearAllTasks() {
  if (clearAllConfirmInput.value.trim().toUpperCase() !== "APAGAR") {
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
  clearAllDialog.close();
  clearAllConfirmInput.value = "";
  clearAllMessage.textContent = "";
  confirmClearAllButton.disabled = true;
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
    openInlineEditor(taskId, button.dataset.field);
    return;
  }

  if (action === "open-inline-select") {
    openInlineSelect(taskId, button.dataset.field);
    return;
  }

  if (action === "update-inline-select") {
    updateInlineSelect(taskId, button.dataset.field, button.dataset.value);
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

function loadCollapsedGroupKeys() {
  const storedValue = localStorage.getItem(GROUP_COLLAPSE_STORAGE_KEY);

  if (!storedValue) {
    return new Set();
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return new Set(Array.isArray(parsedValue) ? parsedValue : []);
  } catch {
    return new Set();
  }
}

function saveCollapsedGroupKeys() {
  localStorage.setItem(GROUP_COLLAPSE_STORAGE_KEY, JSON.stringify([...collapsedGroupKeys]));
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

function openInlineSelect(taskId, field) {
  if (!taskId || !INLINE_SELECT_OPTIONS[field]) {
    return;
  }

  const isSameSelectOpen = activeInlineSelect && activeInlineSelect.taskId === taskId && activeInlineSelect.field === field;

  activeInlineSelect = isSameSelectOpen ? null : { taskId, field };

  render();
}

function updateInlineSelect(taskId, field, value) {
  const validOptions = INLINE_SELECT_OPTIONS[field];

  if (!taskId || !validOptions || !validOptions.includes(value)) {
    return;
  }

  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      [field]: value,
      updatedAt: new Date().toISOString(),
    };
  });

  activeInlineSelect = null;

  saveTasks();
  render();
}

function openInlineEditor(taskId, field) {
  if (!taskId || !["title", "subject", "description", "tags", "dueDate"].includes(field)) {
    return;
  }

  const isSameEditorOpen = activeInlineEditor && activeInlineEditor.taskId === taskId && activeInlineEditor.field === field;

  activeInlineSelect = null;
  activeInlineEditor = isSameEditorOpen ? null : { taskId, field };

  render();

  if (!isSameEditorOpen) {
    focusInlineEditor(taskId, field);
  }
}

function focusInlineEditor(taskId, field) {
  requestAnimationFrame(() => {
    const input = document.querySelector(`[data-inline-editor="${CSS.escape(taskId)}-${CSS.escape(field)}"]`);

    if (!input) {
      return;
    }

    input.focus();

    if (input.type === "text" || input.tagName === "TEXTAREA") {
      input.select();
    }

    if (input.type === "date" && typeof input.showPicker === "function") {
      try {
        input.showPicker();
      } catch {
        // Alguns navegadores bloqueiam o seletor se não considerarem o foco uma ação direta.
      }
    }
  });
}

function handleInlineEditorKeydown(event) {
  const input = event.target.closest("[data-inline-field]");

  if (!input) {
    return;
  }

  const isTextarea = input.tagName === "TEXTAREA";

  if (event.key === "Enter" && !isTextarea) {
    event.preventDefault();
    commitInlineEditor(input);
  }

  if (event.key === "Enter" && isTextarea && event.ctrlKey) {
    event.preventDefault();
    commitInlineEditor(input);
  }

  if (event.key === "Escape") {
    event.preventDefault();
    activeInlineEditor = null;
    render();
  }
}

function handleInlineEditorFocusOut(event) {
  const input = event.target.closest("[data-inline-field]");

  if (!input) {
    return;
  }

  setTimeout(() => {
    const stillInsideSameEditor = document.activeElement?.closest(".inline-edit-control");

    if (!stillInsideSameEditor) {
      commitInlineEditor(input);
    }
  }, 0);
}

function handleInlineEditorChange(event) {
  const input = event.target.closest('[data-inline-field="dueDate"]');

  if (!input) {
    return;
  }

  commitInlineEditor(input);
}

function commitInlineEditor(input) {
  const taskId = input.dataset.id;
  const field = input.dataset.inlineField;
  const rawValue = input.value.trim();

  if (!taskId || !field) {
    return;
  }

  let nextValue = rawValue;

  if (field === "dueDate" && !nextValue) {
    activeInlineEditor = null;
    render();
    return;
  }

  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    if (field === "tags") {
      return {
        ...task,
        tags: nextValue
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        updatedAt: new Date().toISOString(),
      };
    }

    return {
      ...task,
      [field]: nextValue,
      updatedAt: new Date().toISOString(),
    };
  });

  activeInlineEditor = null;

  saveTasks();
  render();
}

function openDetails(taskId) {
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  const subtasks = task.subtasks || [];
  const progress = getChecklistProgress(subtasks);
  const priorityClass = {
    Alta: "badge-priority-high",
    Média: "badge-priority-medium",
    Baixa: "badge-priority-low",
  }[task.priority];

  const tagsHtml = task.tags.length
    ? task.tags.map((tag) => `<span class="badge">#${escapeHtml(tag)}</span>`).join("")
    : `<span class="details-empty-text">Sem etiquetas cadastradas.</span>`;

  const completionPercent = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  detailsTitle.textContent = task.title;

  detailsBody.innerHTML = `
    <section class="details-hero">
      <div>
        <span class="details-kicker">Ficha completa da atividade</span>
        <h3>${escapeHtml(task.title)}</h3>

        <div class="details-hero-meta">
          <span>${escapeHtml(task.type)}</span>
          <span>${escapeHtml(task.subject || "Sem matéria")}</span>
          <span>${formatDate(task.dueDate)}</span>
        </div>
      </div>

      <div class="details-status-stack">
        <span class="badge ${priorityClass || ""}">${escapeHtml(task.priority)}</span>
        <span class="badge">${escapeHtml(task.status)}</span>
      </div>
    </section>

    <section class="details-grid details-grid-compact">
      <article class="details-card">
        <span class="details-card-label">📅 Prazo</span>
        <strong>${formatDate(task.dueDate)}</strong>
        <p>${getDueDateText(task)}</p>
      </article>

      <article class="details-card">
        <span class="details-card-label">🎯 Prioridade</span>
        <strong>${escapeHtml(task.priority)}</strong>
        <p>Nível atual de urgência da atividade.</p>
      </article>

      <article class="details-card">
        <span class="details-card-label">📌 Status</span>
        <strong>${escapeHtml(task.status)}</strong>
        <p>Situação atual do compromisso.</p>
      </article>
    </section>

    <section class="details-card details-progress-card">
      <div class="details-card-header">
        <div>
          <span class="details-card-label">✅ Checklist</span>
          <strong>${progress.done}/${progress.total} concluídas</strong>
        </div>

        <span class="details-progress-pill">${completionPercent}%</span>
      </div>

      <div class="details-progress-track">
        <span style="width: ${completionPercent}%"></span>
      </div>

      <div class="details-checklist-area">
        ${createSubtasksDetailsHtml(task)}
      </div>
    </section>

    <section class="details-grid">
      <article class="details-card">
        <span class="details-card-label">📝 Descrição</span>
        <p class="details-long-text">${escapeHtml(task.description || "Sem descrição adicionada.")}</p>
      </article>

      <article class="details-card">
        <span class="details-card-label">🏷️ Etiquetas</span>
        <div class="details-tags">
          ${tagsHtml}
        </div>
      </article>
    </section>

    <section class="details-card">
      <span class="details-card-label">🕒 Registro</span>

      <div class="details-record-grid">
        <div>
          <strong>Criada em</strong>
          <span>${formatDateTime(task.createdAt)}</span>
        </div>

        <div>
          <strong>Atualizada em</strong>
          <span>${formatDateTime(task.updatedAt)}</span>
        </div>
      </div>
    </section>

    <section class="details-actions">
      <button
        type="button"
        class="button button-secondary"
        data-action="details-toggle-status"
        data-id="${escapeHtml(task.id)}"
      >
        ${task.status === "Concluída" ? "Reabrir atividade" : "Marcar como concluída"}
      </button>

      <button
        type="button"
        class="button button-danger"
        data-action="details-delete"
        data-id="${escapeHtml(task.id)}"
      >
        Excluir atividade
      </button>
    </section>
  `;

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
  deleteDialog.showModal();
}

function closeDeleteDialog() {
  taskIdToDelete = null;
  deleteDialog.close();
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
  renderSummary();

  const filteredTasks = getFilteredTasks();

  taskList.innerHTML = "";

  if (!filteredTasks.length) {
    emptyState.classList.add("is-visible");
    return;
  }

  emptyState.classList.remove("is-visible");
  renderGroupedTasks(filteredTasks);
}

function renderGroupedTasks(filteredTasks) {
  const groups = getTaskGroups(filteredTasks);

  groups.forEach((group) => {
    if (!group.tasks.length) {
      return;
    }

    const groupSection = createTaskGroupSection(group);
    taskList.appendChild(groupSection);
  });
}

function getTaskGroups(filteredTasks) {
  const groupDefinitions = [
    {
      key: "overdue",
      title: "Atrasadas",
      description: "Atividades pendentes que já passaram da data de entrega.",
      icon: "⚠️",
    },
    {
      key: "today",
      title: "Hoje",
      description: "Compromissos que precisam de atenção ainda hoje.",
      icon: "📌",
    },
    {
      key: "tomorrow",
      title: "Amanhã",
      description: "Atividades com prazo para o próximo dia.",
      icon: "🌤️",
    },
    {
      key: "week",
      title: "Esta semana",
      description: "Atividades pendentes com vencimento nos próximos 7 dias.",
      icon: "🗓️",
    },
    {
      key: "future",
      title: "Futuras",
      description: "Demandas com prazo mais distante.",
      icon: "📚",
    },
    {
      key: "completed",
      title: "Concluídas",
      description: "Atividades finalizadas e mantidas no histórico.",
      icon: "✅",
    },
  ];

  return groupDefinitions.map((group) => ({
    ...group,
    tasks: filteredTasks.filter((task) => getTaskGroupKey(task) === group.key),
  }));
}

function getTaskGroupKey(task) {
  if (task.status === "Concluída") {
    return "completed";
  }

  const differenceInDays = getDifferenceInDays(task.dueDate);

  if (differenceInDays < 0) {
    return "overdue";
  }

  if (differenceInDays === 0) {
    return "today";
  }

  if (differenceInDays === 1) {
    return "tomorrow";
  }

  if (differenceInDays <= 7) {
    return "week";
  }

  return "future";
}

function createTaskGroupSection(group) {
  const section = document.createElement("section");
  const isCollapsed = collapsedGroupKeys.has(group.key);

  section.className = `task-group task-group-${group.key} ${isCollapsed ? "is-collapsed" : ""}`;
  section.setAttribute("aria-labelledby", `task-group-${group.key}-title`);

  const pluralText = group.tasks.length === 1 ? "atividade" : "atividades";
  const itemsHtml = group.tasks.map((task) => createTaskCardHtml(task)).join("");

  section.innerHTML = `
    <header class="task-group-header">
      <button
        type="button"
        class="task-group-toggle"
        data-action="toggle-group"
        data-group-key="${group.key}"
        aria-expanded="${!isCollapsed}"
        aria-controls="task-group-${group.key}-items"
      >
        <span class="task-group-arrow">${isCollapsed ? "▸" : "▾"}</span>

        <span class="task-group-toggle-text">
          <span class="task-group-toggle-title" id="task-group-${group.key}-title">
            ${group.icon} ${group.title}
          </span>

          <span class="task-group-toggle-description">
            ${group.description}
          </span>
        </span>
      </button>

      <span class="task-group-count">${group.tasks.length} ${pluralText}</span>
    </header>

    <div
      class="task-group-items"
      id="task-group-${group.key}-items"
      ${isCollapsed ? "hidden" : ""}
    >
      ${itemsHtml}
    </div>
  `;

  return section;
}

function renderSummary() {
  const today = getToday();
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const pending = tasks.filter((task) => task.status !== "Concluída");
  const completed = tasks.filter((task) => task.status === "Concluída");

  const nextSevenDays = tasks.filter((task) => {
    const dueDate = createLocalDate(task.dueDate);

    return task.status !== "Concluída" && dueDate >= today && dueDate <= sevenDaysFromNow;
  });

  totalTasks.textContent = tasks.length;
  pendingTasks.textContent = pending.length;
  weekTasks.textContent = nextSevenDays.length;
  completedTasks.textContent = completed.length;
}

function getFilteredTasks() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  const selectedType = typeFilter.value;
  const selectedSort = sortFilter.value;

  let filtered = [...tasks];

  if (searchTerm) {
    filtered = filtered.filter((task) => {
      const subtasksText = (task.subtasks || []).map((subtask) => subtask.title).join(" ");
      const searchableText = [task.title, task.type, task.subject, task.description, subtasksText, task.tags.join(" ")].join(" ").toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }

  if (selectedStatus !== "Todos") {
    filtered = filtered.filter((task) => task.status === selectedStatus);
  }

  if (selectedType !== "Todos") {
    filtered = filtered.filter((task) => task.type === selectedType);
  }

  filtered.sort((a, b) => {
    if (selectedSort === "dateAsc") {
      return createLocalDate(a.dueDate) - createLocalDate(b.dueDate);
    }

    if (selectedSort === "dateDesc") {
      return createLocalDate(b.dueDate) - createLocalDate(a.dueDate);
    }

    if (selectedSort === "priority") {
      return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    }

    if (selectedSort === "createdDesc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    return 0;
  });

  return filtered;
}

function createTaskCard(task) {
  const template = document.createElement("template");
  template.innerHTML = createTaskCardHtml(task).trim();

  return template.content.firstElementChild;
}

function createEditableOptionBadgeHtml(task, field, extraClass = "") {
  const value = task[field];
  const options = INLINE_SELECT_OPTIONS[field] || [];
  const isOpen = activeInlineSelect && activeInlineSelect.taskId === task.id && activeInlineSelect.field === field;

  const optionsHtml = options
    .map((option) => {
      const selectedClass = option === value ? "is-selected" : "";

      return `
        <button
          type="button"
          class="inline-select-option ${selectedClass}"
          data-action="update-inline-select"
          data-id="${escapeHtml(task.id)}"
          data-field="${escapeHtml(field)}"
          data-value="${escapeHtml(option)}"
        >
          ${escapeHtml(option)}
        </button>
      `;
    })
    .join("");

  return `
    <span class="inline-edit-control">
      <button
        type="button"
        class="badge editable-badge ${extraClass}"
        data-action="open-inline-select"
        data-id="${escapeHtml(task.id)}"
        data-field="${escapeHtml(field)}"
        aria-expanded="${isOpen}"
        title="Editar ${escapeHtml(field)}"
      >
        ${escapeHtml(value)}
        <span class="editable-badge-icon">▾</span>
      </button>

      ${
        isOpen
          ? `
        <span class="inline-select-menu">
          ${optionsHtml}
        </span>
      `
          : ""
      }
    </span>
  `;
}

function createEditableTextBadgeHtml(task, field, displayValue, placeholder = "") {
  const isOpen = activeInlineEditor && activeInlineEditor.taskId === task.id && activeInlineEditor.field === field;

  if (isOpen) {
    return `
      <span class="inline-edit-control inline-edit-control-wide">
        <input
          type="text"
          class="inline-edit-input"
          value="${escapeHtml(task[field] || "")}"
          placeholder="${escapeHtml(placeholder)}"
          data-id="${escapeHtml(task.id)}"
          data-inline-field="${escapeHtml(field)}"
          data-inline-editor="${escapeHtml(task.id)}-${escapeHtml(field)}"
        />
      </span>
    `;
  }

  return `
    <span class="inline-edit-control">
      <button
        type="button"
        class="badge editable-badge"
        data-action="open-inline-editor"
        data-id="${escapeHtml(task.id)}"
        data-field="${escapeHtml(field)}"
        title="Editar ${escapeHtml(field)}"
      >
        ${escapeHtml(displayValue)}
        <span class="editable-badge-icon">✎</span>
      </button>
    </span>
  `;
}

function createEditableTagsHtml(task) {
  const isOpen = activeInlineEditor && activeInlineEditor.taskId === task.id && activeInlineEditor.field === "tags";

  const tagsValue = task.tags.join(", ");
  const displayValue = task.tags.length ? task.tags.map((tag) => `#${tag}`).join(", ") : "Sem tags";

  if (isOpen) {
    return `
      <span class="inline-edit-control inline-edit-control-wide">
        <input
          type="text"
          class="inline-edit-input"
          value="${escapeHtml(tagsValue)}"
          placeholder="Ex.: trabalho, urgente, prova"
          data-id="${escapeHtml(task.id)}"
          data-inline-field="tags"
          data-inline-editor="${escapeHtml(task.id)}-tags"
        />
      </span>
    `;
  }

  return `
    <span class="inline-edit-control">
      <button
        type="button"
        class="badge editable-badge"
        data-action="open-inline-editor"
        data-id="${escapeHtml(task.id)}"
        data-field="tags"
        title="Editar tags"
      >
        ${escapeHtml(displayValue)}
        <span class="editable-badge-icon">✎</span>
      </button>
    </span>
  `;
}

function createEditableTitleHtml(task, completedClass) {
  const isOpen = activeInlineEditor && activeInlineEditor.taskId === task.id && activeInlineEditor.field === "title";

  if (isOpen) {
    return `
      <span class="inline-edit-control inline-edit-control-title">
        <input
          type="text"
          class="inline-edit-input inline-edit-title-input"
          value="${escapeHtml(task.title)}"
          placeholder="Título da atividade"
          data-id="${escapeHtml(task.id)}"
          data-inline-field="title"
          data-inline-editor="${escapeHtml(task.id)}-title"
        />
      </span>
    `;
  }

  return `
    <span class="inline-edit-control inline-edit-control-title">
      <button
        type="button"
        class="task-title inline-title-button ${completedClass}"
        data-action="open-inline-editor"
        data-id="${escapeHtml(task.id)}"
        data-field="title"
        title="Editar título"
      >
        ${escapeHtml(task.title)}
        <span class="editable-badge-icon">✎</span>
      </button>
    </span>
  `;
}

function createEditableDescriptionHtml(task) {
  const isOpen = activeInlineEditor && activeInlineEditor.taskId === task.id && activeInlineEditor.field === "description";

  if (isOpen) {
    return `
      <span class="inline-edit-control inline-edit-control-description">
        <textarea
          class="inline-edit-input inline-edit-textarea"
          placeholder="Descrição / observações"
          data-id="${escapeHtml(task.id)}"
          data-inline-field="description"
          data-inline-editor="${escapeHtml(task.id)}-description"
        >${escapeHtml(task.description || "")}</textarea>
      </span>
    `;
  }

  return `
    <span class="inline-edit-control inline-edit-control-description">
      <button
        type="button"
        class="task-description inline-description-button"
        data-action="open-inline-editor"
        data-id="${escapeHtml(task.id)}"
        data-field="description"
        title="Editar descrição"
      >
        ${escapeHtml(task.description || "Sem descrição adicionada.")}
        <span class="editable-badge-icon">✎</span>
      </button>
    </span>
  `;
}

function createEditableDateHtml(task) {
  const isOpen = activeInlineEditor && activeInlineEditor.taskId === task.id && activeInlineEditor.field === "dueDate";

  if (isOpen) {
    return `
      <span class="inline-edit-control inline-edit-control-date">
        <input
          type="date"
          class="inline-edit-input inline-edit-date-input"
          value="${escapeHtml(task.dueDate)}"
          data-id="${escapeHtml(task.id)}"
          data-inline-field="dueDate"
          data-inline-editor="${escapeHtml(task.id)}-dueDate"
        />
      </span>
    `;
  }

  return `
    <span class="inline-edit-control inline-edit-control-date">
      <button
        type="button"
        class="inline-date-button"
        data-action="open-inline-editor"
        data-id="${escapeHtml(task.id)}"
        data-field="dueDate"
        title="Editar data"
      >
        ${formatDate(task.dueDate)} — ${getDueDateText(task)}
        <span class="editable-badge-icon">✎</span>
      </button>
    </span>
  `;
}

function createTaskCardHtml(task) {
  const completedClass = task.status === "Concluída" ? "is-completed" : "";
  const overdueClass = isOverdue(task) ? "is-overdue" : "";
  const priorityClass = {
    Alta: "badge-priority-high",
    Média: "badge-priority-medium",
    Baixa: "badge-priority-low",
  }[task.priority];
  const toggleLabel = task.status === "Concluída" ? "Reabrir" : "Concluir";
  const toggleIcon = task.status === "Concluída" ? "↩️" : "✅";

  return `
		<article class="task-card ${completedClass} ${overdueClass}">
			<div class="task-top">
				<div class="task-title-group">
					${createEditableTitleHtml(task, completedClass)}

					<div class="task-meta">
					${createEditableOptionBadgeHtml(task, "type")}
					${createEditableTextBadgeHtml(task, "subject", task.subject || "Sem matéria", "Ex.: Matemática")}
					${createEditableOptionBadgeHtml(task, "priority", priorityClass)}
					${createEditableOptionBadgeHtml(task, "status")}
					${createEditableTagsHtml(task)}
					</div>
				</div>
			</div>

			${createEditableDescriptionHtml(task)}

			${createSubtasksPreviewHtml(task)}

			<div class="task-footer">
				<span class="task-date">
					${createEditableDateHtml(task)}
				</span>

				<div class="task-actions">
				<button
					type="button"
					class="task-action-button"
					data-action="view"
					data-id="${escapeHtml(task.id)}"
					data-tooltip="Ver atividade"
					aria-label="Ver atividade"
					title="Ver atividade"
				>
					<span class="task-action-icon">👁️</span>
					<span class="task-action-label">Ver</span>
				</button>

				<button
					type="button"
					class="task-action-button"
					data-action="toggle"
					data-id="${escapeHtml(task.id)}"
					data-tooltip="${escapeHtml(toggleLabel)} atividade"
					aria-label="${escapeHtml(toggleLabel)} atividade"
					title="${escapeHtml(toggleLabel)} atividade"
				>
					<span class="task-action-icon">${toggleIcon}</span>
					<span class="task-action-label">${escapeHtml(toggleLabel)}</span>
				</button>

				<button
					type="button"
					class="task-action-button task-action-button-danger"
					data-action="delete"
					data-id="${escapeHtml(task.id)}"
					data-tooltip="Excluir atividade"
					aria-label="Excluir atividade"
					title="Excluir atividade"
				>
					<span class="task-action-icon">🗑️</span>
					<span class="task-action-label">Excluir</span>
				</button>
				</div>
			</div>
		</article>
	`;
}

function createSubtasksPreviewHtml(task) {
  const subtasks = task.subtasks || [];

  if (!subtasks.length) {
    return "";
  }

  const isExpanded = expandedChecklistTaskIds.has(task.id);
  const progress = getChecklistProgress(subtasks);
  const visibleSubtasks = subtasks.slice(0, 3);
  const hiddenCount = subtasks.length - visibleSubtasks.length;

  const subtasksHtml = visibleSubtasks.map((subtask) => createSubtaskButtonHtml(task.id, subtask)).join("");

  return `
    <div class="task-checklist ${isExpanded ? "is-expanded" : "is-collapsed"}">
      <button
        type="button"
        class="task-checklist-toggle"
        data-action="toggle-checklist-preview"
        data-id="${escapeHtml(task.id)}"
        aria-expanded="${isExpanded}"
      >
        <span class="task-checklist-arrow">${isExpanded ? "▾" : "▸"}</span>
        <span class="task-checklist-label">Checklist</span>
        <span class="task-checklist-progress">${progress.done}/${progress.total} concluídas</span>
      </button>

      ${
        isExpanded
          ? `
        <div class="subtask-list">
          ${subtasksHtml}
        </div>

        ${hiddenCount > 0 ? `<span class="task-checklist-more">+${hiddenCount} etapa${hiddenCount > 1 ? "s" : ""} no detalhe</span>` : ""}
      `
          : ""
      }
    </div>
  `;
}

function createSubtasksDetailsHtml(task) {
  const subtasks = task.subtasks || [];

  if (!subtasks.length) {
    return "<span>Nenhuma etapa adicionada.</span>";
  }

  const progress = getChecklistProgress(subtasks);
  const subtasksHtml = subtasks.map((subtask) => createSubtaskButtonHtml(task.id, subtask)).join("");

  return `
		<div class="task-checklist task-checklist-details">
			<div class="task-checklist-header">
				<strong>Progresso</strong>
				<span>${progress.done}/${progress.total} concluídas</span>
			</div>

			<div class="subtask-list">
				${subtasksHtml}
			</div>
		</div>
	`;
}

function createSubtaskButtonHtml(taskId, subtask) {
  const doneClass = subtask.done ? "is-done" : "";

  return `
		<button
			type="button"
			class="subtask-item ${doneClass}"
			data-action="toggle-subtask"
			data-id="${escapeHtml(taskId)}"
			data-subtask-id="${escapeHtml(subtask.id)}"
			aria-pressed="${subtask.done}"
		>
			<span class="subtask-checkbox">${subtask.done ? "✓" : ""}</span>
			<span class="subtask-title">${escapeHtml(subtask.title)}</span>
		</button>
	`;
}

function getChecklistProgress(subtasks) {
  return {
    total: subtasks.length,
    done: subtasks.filter((subtask) => subtask.done).length,
  };
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

function loadTasks() {
  const storedTasks = localStorage.getItem(STORAGE_KEY);

  if (!storedTasks) {
    return [];
  }

  try {
    return JSON.parse(storedTasks);
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return String(Date.now() + Math.random());
}

function createLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatDateTime(value) {
  if (!value) {
    return "Não registrado";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Não registrado";
  }

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateString) {
  if (!dateString) {
    return "Sem data";
  }

  const date = createLocalDate(dateString);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getDueDateText(task) {
  if (task.status === "Concluída") {
    return "concluída";
  }

  const differenceInDays = getDifferenceInDays(task.dueDate);

  if (differenceInDays < 0) {
    const days = Math.abs(differenceInDays);
    return `atrasada há ${days} dia${days > 1 ? "s" : ""}`;
  }

  if (differenceInDays === 0) {
    return "vence hoje";
  }

  if (differenceInDays === 1) {
    return "vence amanhã";
  }

  return `faltam ${differenceInDays} dias`;
}

function getDifferenceInDays(dateString) {
  const today = getToday();
  const dueDate = createLocalDate(dateString);

  const differenceInTime = dueDate - today;
  return Math.round(differenceInTime / 86400000);
}

function isOverdue(task) {
  if (task.status === "Concluída") {
    return false;
  }

  return getDifferenceInDays(task.dueDate) < 0;
}

function getPriorityWeight(priority) {
  const weights = {
    Baixa: 1,
    Média: 2,
    Alta: 3,
  };

  return weights[priority] || 0;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
