// =============================
// Tasks Inline Edit
// File: features/tasks/tasks.inline-edit.js
// =============================

import { INLINE_SELECT_OPTIONS } from "./tasks.constants.js";

const INLINE_EDITOR_FIELDS = ["title", "subject", "description", "tags", "dueDate"];

export function createInlineEditController({ getTasks, setTasks, saveTasks, render }) {
  let activeInlineSelect = null;
  let activeInlineEditor = null;

  function getState() {
    return {
      activeInlineSelect,
      activeInlineEditor,
    };
  }

  function hasActiveInlineEdit() {
    return Boolean(activeInlineSelect || activeInlineEditor);
  }

  function clearInlineEdit() {
    activeInlineSelect = null;
    activeInlineEditor = null;
  }

  function clearInlineEditAndRender() {
    if (!hasActiveInlineEdit()) {
      return;
    }

    clearInlineEdit();
    render();
  }

  function openInlineSelect(taskId, field) {
    if (!taskId || !INLINE_SELECT_OPTIONS[field]) {
      return;
    }

    const isSameSelectOpen = activeInlineSelect && activeInlineSelect.taskId === taskId && activeInlineSelect.field === field;

    activeInlineSelect = isSameSelectOpen ? null : { taskId, field };
    activeInlineEditor = null;

    render();
  }

  function updateInlineSelect(taskId, field, value) {
    const validOptions = INLINE_SELECT_OPTIONS[field];

    if (!taskId || !validOptions || !validOptions.includes(value)) {
      return;
    }

    const nextTasks = getTasks().map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      return {
        ...task,
        [field]: value,
        updatedAt: new Date().toISOString(),
      };
    });

    setTasks(nextTasks);
    activeInlineSelect = null;

    saveTasks();
    render();
  }

  function openInlineEditor(taskId, field) {
    if (!taskId || !INLINE_EDITOR_FIELDS.includes(field)) {
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

    const nextValue = rawValue;

    if (field === "dueDate" && !nextValue) {
      activeInlineEditor = null;
      render();
      return;
    }

    const nextTasks = getTasks().map((task) => {
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

    setTasks(nextTasks);
    activeInlineEditor = null;

    saveTasks();
    render();
  }

  return {
    getState,
    hasActiveInlineEdit,
    clearInlineEdit,
    clearInlineEditAndRender,
    openInlineSelect,
    updateInlineSelect,
    openInlineEditor,
    handleInlineEditorKeydown,
    handleInlineEditorFocusOut,
    handleInlineEditorChange,
  };
}
