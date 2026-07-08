// =============================
// Tasks Form
// File: features/tasks/tasks.form.js
// =============================

import { addDays, createId, formatShortDate, getToday, toDateInputValue } from "./tasks.utils.js";

export function createTaskFormController({ elements, getTasks, setTasks, saveTasks, render, closeCreateTaskDialog, showToast }) {
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
    createTaskDialog,
  } = elements;

  function getShortcutButtons() {
    if (!dueDateShortcuts) {
      return [];
    }

    return Array.from(dueDateShortcuts.querySelectorAll("[data-date-shortcut]"));
  }

  function getShortcutDate(daysToAdd) {
    return toDateInputValue(addDays(getToday(), daysToAdd));
  }

  function initializeDateShortcuts() {
    getShortcutButtons().forEach((button) => {
      const daysToAdd = Number(button.dataset.dateShortcut);
      const label = button.querySelector("[data-date-shortcut-label]");

      if (!Number.isFinite(daysToAdd) || !label) {
        return;
      }

      label.textContent = formatShortDate(getShortcutDate(daysToAdd));
    });

    syncDueDateShortcutState();
  }

  function syncDueDateShortcutState() {
    const selectedDate = dueDateInput.value;

    getShortcutButtons().forEach((button) => {
      const daysToAdd = Number(button.dataset.dateShortcut);
      const shortcutDate = Number.isFinite(daysToAdd) ? getShortcutDate(daysToAdd) : "";
      const isActive = Boolean(selectedDate) && selectedDate === shortcutDate;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function handleDueDateShortcut(event) {
    const button = event.target.closest("[data-date-shortcut]");

    if (!button) {
      return;
    }

    const daysToAdd = Number(button.dataset.dateShortcut);

    if (!Number.isFinite(daysToAdd)) {
      return;
    }

    dueDateInput.value = getShortcutDate(daysToAdd);
    syncDueDateShortcutState();
    dueDateInput.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const taskData = getFormData();

    if (!taskData.title || !taskData.dueDate) {
      showFormMessage("Preencha pelo menos o título e a data de entrega.", "error");
      showToast?.("Preencha título e data de entrega.", "error");
      return;
    }

    const tasks = getTasks();
    const editingId = taskIdInput.value;

    if (editingId) {
      const nextTasks = tasks.map((task) => {
        if (task.id !== editingId) {
          return task;
        }

        return {
          ...task,
          ...taskData,
          updatedAt: new Date().toISOString(),
        };
      });

      setTasks(nextTasks);
      showFormMessage("", "");
      showToast?.("Atividade atualizada.", "success");
    } else {
      const newTask = {
        id: createId(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTasks([newTask, ...tasks]);
      showFormMessage("", "");
      showToast?.("Atividade criada.", "success");
    }

    saveTasks();
    resetForm(false);
    render();

    if (createTaskDialog.open) {
      closeCreateTaskDialog();
    }
  }

  function getFormData() {
    const existingTask = getTasks().find((task) => task.id === taskIdInput.value);

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
    const existingSubtasksByTitle = new Map(
      existingSubtasks.map((subtask) => [subtask.title.trim().toLowerCase(), subtask])
    );

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

  function resetForm(clearMessage = true) {
    taskForm.reset();

    taskIdInput.value = "";
    priorityInput.value = "Média";
    statusInput.value = "Pendente";

    formTitle.textContent = "Nova atividade";
    submitButton.textContent = "Salvar atividade";

    syncDueDateShortcutState();

    if (clearMessage) {
      showFormMessage("", "");
    }
  }

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type || ""}`;
  }

  return {
    handleSubmit,
    handleDueDateShortcut,
    initializeDateShortcuts,
    syncDueDateShortcutState,
    getFormData,
    getSubtasksFromInput,
    resetForm,
    showFormMessage,
  };
}
