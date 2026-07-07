// =============================
// Tasks Form
// File: features/tasks/tasks.form.js
// =============================

import { createId } from "./tasks.utils.js";

export function createTaskFormController({ elements, getTasks, setTasks, saveTasks, render, closeCreateTaskDialog }) {
  const {
    taskForm,
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
    formMessage,
    createTaskDialog,
  } = elements;

  function handleSubmit(event) {
    event.preventDefault();

    const taskData = getFormData();

    if (!taskData.title || !taskData.dueDate) {
      showFormMessage("Preencha pelo menos o título e a data de entrega.", "error");
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
      showFormMessage("Atividade atualizada com sucesso.", "success");
    } else {
      const newTask = {
        id: createId(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTasks([newTask, ...tasks]);
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
    getFormData,
    getSubtasksFromInput,
    resetForm,
    showFormMessage,
  };
}
