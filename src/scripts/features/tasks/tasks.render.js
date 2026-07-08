// =============================
// Tasks Render
// File: features/tasks/tasks.render.js
// =============================

import { getPriorityWeight, getTaskGroups } from "./tasks.model.js";
import { createLocalDate, getToday } from "./tasks.utils.js";
import { createTaskGroupSection } from "./tasks.ui.js";
import { renderTodayFocusPanel } from "./tasks.focus.js";
import { clearListFilters, renderEmptyState } from "./tasks.empty-state.js";

export function createTasksRenderer({
  elements,
  getTasks,
  getCollapsedGroupKeys,
  getExpandedChecklistTaskIds,
  getInlineEditState,
  getChecklistComposerTaskId = () => null,
}) {
  function render() {
    renderSummary();
    renderTodayFocusPanel(elements, getTasks());

    const filteredTasks = getFilteredTasks();

    elements.taskList.innerHTML = "";

    renderEmptyState(elements, {
      tasks: getTasks(),
      filteredTasks,
      searchTerm: elements.searchInput.value.trim(),
      selectedStatus: elements.statusFilter.value,
      selectedType: elements.typeFilter.value,
    });

    if (!filteredTasks.length) {
      return;
    }

    renderGroupedTasks(filteredTasks);
  }

  function renderGroupedTasks(filteredTasks) {
    const groups = getTaskGroups(filteredTasks);
    const renderState = {
      collapsedGroupKeys: getCollapsedGroupKeys(),
      expandedChecklistTaskIds: getExpandedChecklistTaskIds(),
      activeChecklistComposerTaskId: getChecklistComposerTaskId(),
      ...getInlineEditState(),
    };

    groups.forEach((group) => {
      if (!group.tasks.length) {
        return;
      }

      const groupSection = createTaskGroupSection(group, renderState);
      elements.taskList.appendChild(groupSection);
    });
  }

  function renderSummary() {
    const tasks = getTasks();
    const today = getToday();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const pending = tasks.filter((task) => task.status !== "Concluída");
    const completed = tasks.filter((task) => task.status === "Concluída");

    const nextSevenDays = tasks.filter((task) => {
      const dueDate = createLocalDate(task.dueDate);

      return task.status !== "Concluída" && dueDate >= today && dueDate <= sevenDaysFromNow;
    });

    elements.totalTasks.textContent = tasks.length;
    elements.pendingTasks.textContent = pending.length;
    elements.weekTasks.textContent = nextSevenDays.length;
    elements.completedTasks.textContent = completed.length;
  }

  function getFilteredTasks() {
    const tasks = getTasks();
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    const selectedStatus = elements.statusFilter.value;
    const selectedType = elements.typeFilter.value;
    const selectedSort = elements.sortFilter.value;

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

  function clearFilters() {
    clearListFilters(elements);
    render();
  }

  return {
    render,
    renderGroupedTasks,
    renderSummary,
    getFilteredTasks,
    clearFilters,
  };
}
