// =============================
// Tasks Actions
// File: features/tasks/tasks.actions.js
// =============================

import { createDetailsHtml } from "./tasks.ui.js";

export function createTaskActionsController({
  elements,
  getTasks,
  setTasks,
  saveTasks,
  render,
  resetForm,
  showFormMessage,
  getCollapsedGroupKeys,
  saveCollapsedGroupKeys,
  getExpandedChecklistTaskIds,
  openDialog,
  closeDialog,
}) {
  let taskIdToDelete = null;

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

    render();

    if (shouldRefreshDetails && elements.detailsDialog.open) {
      openDetails(taskId);
    }
  }

  function toggleTaskStatus(taskId) {
    updateTask(taskId, (task) => ({
      ...task,
      status: task.status === "Concluída" ? "Pendente" : "Concluída",
    }));

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

    const details = createDetailsHtml(task);

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
      elements.detailsDialog.close();
      openDeleteDialog(taskId);
    }
  }

  return {
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
