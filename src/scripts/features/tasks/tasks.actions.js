// =============================
// Tasks Actions
// File: features/tasks/tasks.actions.js
// =============================

import { createDetailsHtml } from "./tasks.ui.js";
import { addDays, createId, formatDate, getToday, toDateInputValue } from "./tasks.utils.js";

export function createTaskActionsController({
  elements,
  getTasks,
  setTasks,
  saveTasks,
  render,
  resetForm,
  showFormMessage,
  showToast,
  getCollapsedGroupKeys,
  saveCollapsedGroupKeys,
  getExpandedChecklistTaskIds,
  openDialog,
  closeDialog,
}) {
  let taskIdToDelete = null;
  let activeChecklistComposerTaskId = null;

  function getChecklistComposerTaskId() {
    return activeChecklistComposerTaskId;
  }

  function focusChecklistComposer(taskId) {
    requestAnimationFrame(() => {
      const input = document.querySelector(`[data-subtask-composer="${CSS.escape(taskId)}"]`);

      if (!input) {
        return;
      }

      input.focus();
    });
  }

  function openSubtaskComposer(taskId, shouldRefreshDetails = false) {
    if (!taskId) {
      return;
    }

    const isSameComposerOpen = activeChecklistComposerTaskId === taskId;
    activeChecklistComposerTaskId = isSameComposerOpen ? null : taskId;

    if (!isSameComposerOpen) {
      getExpandedChecklistTaskIds().add(taskId);
    }

    render();

    if (shouldRefreshDetails && elements.detailsDialog.open) {
      openDetails(taskId);
    }

    if (!isSameComposerOpen) {
      focusChecklistComposer(taskId);
    }
  }

  function closeSubtaskComposer(shouldRender = true) {
    if (!activeChecklistComposerTaskId) {
      return;
    }

    activeChecklistComposerTaskId = null;

    if (shouldRender) {
      render();
    }
  }

  function updateTask(taskId, updater) {
    const nextTasks = getTasks().map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      return {
        ...updater(task),
        updatedAt: new Date().toISOString(),
      };
    });

    setTasks(nextTasks);
    saveTasks();
  }

  function toggleSubtask(taskId, subtaskId, shouldRefreshDetails = false) {
    updateTask(taskId, (task) => ({
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
    }));

    showToast?.("Checklist atualizado.", "success");
    render();

    if (shouldRefreshDetails && elements.detailsDialog.open) {
      openDetails(taskId);
    }
  }

  function toggleTaskStatus(taskId) {
    const task = getTasks().find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    const nextStatus = task.status === "Concluída" ? "Pendente" : "Concluída";

    updateTask(taskId, (currentTask) => ({
      ...currentTask,
      status: nextStatus,
    }));

    showToast?.(nextStatus === "Concluída" ? "Atividade concluída." : "Atividade reaberta.", "success");
    render();
  }

  function toggleGroup(groupKey) {
    if (!groupKey) {
      return;
    }

    const collapsedGroupKeys = getCollapsedGroupKeys();

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

    const expandedChecklistTaskIds = getExpandedChecklistTaskIds();

    if (expandedChecklistTaskIds.has(taskId)) {
      expandedChecklistTaskIds.delete(taskId);
    } else {
      expandedChecklistTaskIds.add(taskId);
    }

    render();
  }

  function openDetails(taskId) {
    const task = getTasks().find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    const details = createDetailsHtml(task, { activeChecklistComposerTaskId });

    elements.detailsTitle.textContent = details.title;
    elements.detailsBody.innerHTML = details.bodyHtml;

    if (!elements.detailsDialog.open) {
      elements.detailsDialog.showModal();
    }
  }

  function editTask(taskId) {
    const task = getTasks().find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    elements.taskIdInput.value = task.id;
    elements.titleInput.value = task.title;
    elements.typeInput.value = task.type;
    elements.subjectInput.value = task.subject;
    elements.dueDateInput.value = task.dueDate;
    elements.priorityInput.value = task.priority;
    elements.statusInput.value = task.status;
    elements.descriptionInput.value = task.description;
    elements.subtasksInput.value = (task.subtasks || []).map((subtask) => subtask.title).join("\n");
    elements.tagsInput.value = task.tags.join(", ");

    elements.formTitle.textContent = "Editar atividade";
    elements.submitButton.textContent = "Atualizar atividade";

    showFormMessage("Editando atividade selecionada.", "success");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function openDeleteDialog(taskId) {
    taskIdToDelete = taskId;
    openDialog(elements.deleteDialog);
  }

  function closeDeleteDialog() {
    taskIdToDelete = null;
    closeDialog(elements.deleteDialog);
  }

  function deleteSelectedTask() {
    if (!taskIdToDelete) {
      return;
    }

    setTasks(getTasks().filter((task) => task.id !== taskIdToDelete));

    saveTasks();
    render();
    resetForm(false);
    closeDeleteDialog();
    showToast?.("Atividade excluída.", "success");
  }

  function postponeTask(taskId, days, shouldRefreshDetails = false) {
    const daysToAdd = Number(days);

    if (!taskId || !Number.isFinite(daysToAdd)) {
      return;
    }

    const task = getTasks().find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    if (task.status === "Concluída") {
      showToast?.("Reabra a atividade antes de alterar o prazo.", "warning");
      return;
    }

    const nextDate = toDateInputValue(addDays(getToday(), daysToAdd));

    updateTask(taskId, (currentTask) => ({
      ...currentTask,
      dueDate: nextDate,
    }));

    const message = daysToAdd === 1 ? "Prazo alterado para amanhã." : `Prazo alterado para ${formatDate(nextDate)}.`;

    showToast?.(message, "success");
    render();

    if (shouldRefreshDetails && elements.detailsDialog.open) {
      openDetails(taskId);
    }
  }

  function addSubtask(taskId, title, shouldRefreshDetails = false) {
    const nextTitle = String(title || "").trim();

    if (!taskId || !nextTitle) {
      showToast?.("Digite o nome da etapa antes de adicionar.", "error");
      return;
    }

    const task = getTasks().find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    const alreadyExists = (task.subtasks || []).some((subtask) => subtask.title.trim().toLowerCase() === nextTitle.toLowerCase());

    if (alreadyExists) {
      showToast?.("Essa etapa já existe no checklist.", "error");
      return;
    }

    updateTask(taskId, (currentTask) => ({
      ...currentTask,
      subtasks: [
        ...(currentTask.subtasks || []),
        {
          id: createId(),
          title: nextTitle,
          done: false,
        },
      ],
    }));

    activeChecklistComposerTaskId = null;
    getExpandedChecklistTaskIds().add(taskId);

    showToast?.("Etapa adicionada ao checklist.", "success");
    render();

    if (shouldRefreshDetails && elements.detailsDialog.open) {
      openDetails(taskId);
    }
  }

  function handleSubtaskComposerSubmit(event, shouldRefreshDetails = false) {
    const form = event.target.closest('form[data-action="add-subtask"]');

    if (!form) {
      return;
    }

    event.preventDefault();

    const input = form.querySelector("[data-subtask-title-input]");
    addSubtask(form.dataset.id, input?.value, shouldRefreshDetails);
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

    if (action === "open-subtask-composer") {
      openSubtaskComposer(taskId, true);
      return;
    }

    if (action === "cancel-subtask-composer") {
      closeSubtaskComposer(false);
      openDetails(taskId);
      return;
    }

    if (action === "quick-postpone") {
      postponeTask(taskId, button.dataset.days, true);
      return;
    }

    if (action === "details-toggle-status") {
      toggleTaskStatus(taskId);
      openDetails(taskId);
      return;
    }

    if (action === "details-delete") {
      elements.detailsDialog.close();
      openDeleteDialog(taskId);
    }
  }

  return {
    getChecklistComposerTaskId,
    openSubtaskComposer,
    closeSubtaskComposer,
    addSubtask,
    postponeTask,
    handleSubtaskComposerSubmit,
    toggleSubtask,
    toggleTaskStatus,
    toggleGroup,
    toggleChecklistPreview,
    openDetails,
    editTask,
    openDeleteDialog,
    closeDeleteDialog,
    deleteSelectedTask,
    handleDetailsAction,
  };
}
