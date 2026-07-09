// =============================
// Tasks UI
// File: features/tasks/tasks.ui.js
// =============================

import { INLINE_SELECT_OPTIONS } from "./tasks.constants.js";
import { getChecklistProgress, getDueDateText, isOverdue } from "./tasks.model.js";
import { addDays, createLocalDate, escapeHtml, formatDate, formatDateTime, formatShortDate, toDateInputValue } from "./tasks.utils.js";

export function createTaskGroupSection(group, uiState = {}) {
  const section = document.createElement("section");
  const collapsedGroupKeys = uiState.collapsedGroupKeys || new Set();
  const isCollapsed = collapsedGroupKeys.has(group.key);

  section.className = `task-group task-group-${group.key} ${isCollapsed ? "is-collapsed" : ""}`;
  section.setAttribute("aria-labelledby", `task-group-${group.key}-title`);

  const pluralText = group.tasks.length === 1 ? "atividade" : "atividades";
  const itemsHtml = group.tasks.map((task) => createTaskCardHtml(task, uiState)).join("");

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

export function createDetailsHtml(task, uiState = {}) {
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

  return {
    title: task.title,
    bodyHtml: `
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
          <strong>${createChecklistProgressHtml(progress)}</strong>
        </div>

        <span class="details-progress-pill">${completionPercent}%</span>
      </div>

      <div class="details-progress-track">
        <span style="width: ${completionPercent}%"></span>
      </div>

      <div class="details-checklist-area">
        ${createSubtasksDetailsHtml(task, uiState)}
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
      ${createQuickDueActionsHtml(task, "details")}

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
  `,
  };
}

function createEditableOptionBadgeHtml(task, field, uiState = {}, extraClass = "") {
  const value = task[field];
  const options = INLINE_SELECT_OPTIONS[field] || [];
  const activeInlineSelect = uiState.activeInlineSelect;
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

function createEditableTextBadgeHtml(task, field, displayValue, placeholder = "", uiState = {}) {
  const activeInlineEditor = uiState.activeInlineEditor;
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

function createEditableTagsHtml(task, uiState = {}) {
  const activeInlineEditor = uiState.activeInlineEditor;
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

function createEditableTitleHtml(task, completedClass, uiState = {}) {
  const activeInlineEditor = uiState.activeInlineEditor;
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

function createEditableDescriptionHtml(task, uiState = {}) {
  const activeInlineEditor = uiState.activeInlineEditor;
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

function createEditableDateHtml(task, uiState = {}) {
  const activeInlineEditor = uiState.activeInlineEditor;
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

function createTaskCardHtml(task, uiState = {}) {
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
		<article class="task-card ${completedClass} ${overdueClass}" data-task-card="${escapeHtml(task.id)}">
			<div class="task-top">
				<div class="task-title-group">
					${createEditableTitleHtml(task, completedClass, uiState)}

					<div class="task-meta">
					${createEditableOptionBadgeHtml(task, "type", uiState)}
					${createEditableTextBadgeHtml(task, "subject", task.subject || "Sem matéria", "Ex.: Matemática", uiState)}
					${createEditableOptionBadgeHtml(task, "priority", uiState, priorityClass)}
					${createEditableOptionBadgeHtml(task, "status", uiState)}
					${createEditableTagsHtml(task, uiState)}
					</div>
				</div>
			</div>

			${createEditableDescriptionHtml(task, uiState)}

			${createSubtasksPreviewHtml(task, uiState)}

			<div class="task-footer">
				<span class="task-date">
					${createEditableDateHtml(task, uiState)}
				</span>

				${createQuickDueActionsHtml(task, "card")}

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

function createQuickDueActionsHtml(task, context = "card") {
  if (task.status === "Concluída") {
    return "";
  }

  const prefixClass = context === "details" ? "quick-due-actions quick-due-actions-details" : "quick-due-actions";
  const buttonClass = context === "details" ? "button button-secondary quick-due-button" : "quick-due-button";
  const quickDueActions = [
    {
      days: 1,
      label: "+1 Dia",
      title: "Adicionar 1 dia ao prazo",
    },
    {
      days: 7,
      label: "+1 Semana",
      title: "Adicionar 1 semana ao prazo",
    },
  ];

  const buttonsHtml = quickDueActions
    .map((action) => {
      const nextDate = toDateInputValue(addDays(createLocalDate(task.dueDate), action.days));
      const shortDate = formatShortDate(nextDate);

      return `
      <button
        type="button"
        class="${buttonClass}"
        data-action="quick-postpone"
        data-id="${escapeHtml(task.id)}"
        data-days="${action.days}"
        title="${escapeHtml(action.title)}: ${shortDate}"
      >
        ↷ ${escapeHtml(action.label)} - ${shortDate}
      </button>
    `;
    })
    .join("");

  return `
    <div class="${prefixClass}" aria-label="Ações rápidas de prazo">
      ${buttonsHtml}
    </div>
  `;
}


function createChecklistProgressHtml(progress, extraClass = "") {
  return `
    <span class="checklist-progress-text ${extraClass}">
      <span class="checklist-progress-count">${progress.done}/${progress.total}</span>
      <span class="checklist-progress-label">concluídas</span>
      <span class="checklist-progress-emoji" aria-label="concluídas">✅</span>
    </span>
  `;
}

function getPreviewSubtasks(subtasks, limit = 3) {
  const pendingSubtasks = subtasks.filter((subtask) => !subtask.done);
  const doneSubtasks = subtasks.filter((subtask) => subtask.done);

  return [...pendingSubtasks, ...doneSubtasks].slice(0, limit);
}

function createSubtasksPreviewHtml(task, uiState = {}) {
  const subtasks = task.subtasks || [];
  const expandedChecklistTaskIds = uiState.expandedChecklistTaskIds || new Set();
  const isExpanded = expandedChecklistTaskIds.has(task.id);
  const progress = getChecklistProgress(subtasks);
  const visibleSubtasks = getPreviewSubtasks(subtasks, 3);
  const hiddenCount = subtasks.length - visibleSubtasks.length;
  const hasSubtasks = subtasks.length > 0;
  const subtasksHtml = visibleSubtasks.map((subtask) => createSubtaskButtonHtml(task.id, subtask)).join("");
  const composerHtml = createSubtaskComposerHtml(task.id, uiState, "card");

  return `
    <div class="task-checklist ${isExpanded ? "is-expanded" : "is-collapsed"} ${hasSubtasks ? "" : "task-checklist-empty"}">
      <div class="task-checklist-top">
        ${
          hasSubtasks
            ? `
        <button
          type="button"
          class="task-checklist-toggle"
          data-action="toggle-checklist-preview"
          data-id="${escapeHtml(task.id)}"
          aria-expanded="${isExpanded}"
        >
          <span class="task-checklist-arrow">${isExpanded ? "▾" : "▸"}</span>
          <span class="task-checklist-label">Checklist</span>
          <span class="task-checklist-progress">${createChecklistProgressHtml(progress)}</span>
        </button>
      `
            : `
        <div class="task-checklist-summary">
          <span class="task-checklist-arrow">＋</span>
          <span class="task-checklist-label">Checklist</span>
          <span class="task-checklist-progress">Sem etapas</span>
        </div>
      `
        }

        <button
          type="button"
          class="subtask-add-trigger"
          data-action="open-subtask-composer"
          data-id="${escapeHtml(task.id)}"
          aria-label="Adicionar etapa ao checklist"
          title="Adicionar etapa ao checklist"
        >
          + etapa
        </button>
      </div>

      ${composerHtml}

      ${
        isExpanded && hasSubtasks
          ? `
        <div class="subtask-list">
          ${subtasksHtml}
        </div>

        ${
          hiddenCount > 0
            ? `<button
                type="button"
                class="task-checklist-more task-checklist-more-button"
                data-action="view"
                data-id="${escapeHtml(task.id)}"
                title="Ver checklist completo nos detalhes"
              >
                +${hiddenCount} etapa${hiddenCount > 1 ? "s" : ""} no detalhe
              </button>`
            : ""
        }
      `
          : ""
      }
    </div>
  `;
}

function createSubtasksDetailsHtml(task, uiState = {}) {
  const subtasks = task.subtasks || [];
  const progress = getChecklistProgress(subtasks);
  const subtasksHtml = subtasks.map((subtask) => createSubtaskButtonHtml(task.id, subtask)).join("");
  const composerHtml = createSubtaskComposerHtml(task.id, uiState, "details");

  return `
    <div class="task-checklist task-checklist-details ${subtasks.length ? "" : "task-checklist-empty"}">
      <div class="task-checklist-header">
        <strong>Progresso</strong>
        <span>${createChecklistProgressHtml(progress)}</span>
      </div>

      ${
        subtasks.length
          ? `
      <div class="subtask-list">
        ${subtasksHtml}
      </div>
    `
          : `<span class="task-checklist-more">Nenhuma etapa adicionada ainda.</span>`
      }

      <div class="subtask-add-row">
        <button
          type="button"
          class="subtask-add-trigger"
          data-action="open-subtask-composer"
          data-id="${escapeHtml(task.id)}"
        >
          + Adicionar etapa
        </button>
      </div>

      ${composerHtml}
    </div>
  `;
}

function createSubtaskComposerHtml(taskId, uiState = {}, context = "card") {
  const isOpen = uiState.activeChecklistComposerTaskId === taskId;

  if (!isOpen) {
    return "";
  }

  const placeholder = context === "details" ? "Nova etapa do checklist" : "Digite uma nova etapa";

  return `
    <form
      class="subtask-add-form"
      data-action="add-subtask"
      data-context="${escapeHtml(context)}"
      data-id="${escapeHtml(taskId)}"
    >
      <input
        type="text"
        class="subtask-add-input"
        placeholder="${escapeHtml(placeholder)}"
        data-subtask-title-input
        data-subtask-composer="${escapeHtml(taskId)}"
        autocomplete="off"
      />

      <div class="subtask-add-actions">
        <button type="submit" class="subtask-add-confirm">Adicionar</button>
        <button
          type="button"
          class="subtask-add-cancel"
          data-action="cancel-subtask-composer"
          data-id="${escapeHtml(taskId)}"
        >
          Cancelar
        </button>
      </div>
    </form>
  `;
}

function createSubtaskButtonHtml(taskId, subtask) {
  const doneClass = subtask.done ? "is-done" : "";
  const escapedTaskId = escapeHtml(taskId);
  const escapedSubtaskId = escapeHtml(subtask.id);
  const escapedTitle = escapeHtml(subtask.title);

  return `
    <div class="subtask-row ${doneClass}">
      <button
        type="button"
        class="subtask-item ${doneClass}"
        data-action="toggle-subtask"
        data-id="${escapedTaskId}"
        data-subtask-id="${escapedSubtaskId}"
        aria-pressed="${subtask.done}"
        title="${subtask.done ? "Reabrir etapa" : "Concluir etapa"}"
      >
        <span class="subtask-checkbox">${subtask.done ? "✓" : ""}</span>
        <span class="subtask-title">${escapedTitle}</span>
      </button>

      <button
        type="button"
        class="subtask-delete-button"
        data-action="delete-subtask"
        data-id="${escapedTaskId}"
        data-subtask-id="${escapedSubtaskId}"
        aria-label="Excluir etapa ${escapedTitle}"
        title="Excluir etapa"
      >
        ×
      </button>
    </div>
  `;
}
