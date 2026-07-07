// =============================
// Tasks Model
// File: features/tasks/tasks.model.js
// =============================

import { PRIORITY_OPTIONS, STATUS_OPTIONS, TASK_GROUP_DEFINITIONS, TYPE_OPTIONS } from "./tasks.constants.js";
import { createId, createLocalDate, getToday } from "./tasks.utils.js";

export function normalizeImportedTasks(backupData) {
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
        type: normalizeOption(task.type, TYPE_OPTIONS, "Outro"),
        subject: String(task.subject || "").trim(),
        dueDate,
        priority: normalizeOption(task.priority, PRIORITY_OPTIONS, "Média"),
        status: normalizeOption(task.status, STATUS_OPTIONS, "Pendente"),
        description: String(task.description || "").trim(),
        tags: normalizeTags(task.tags),
        subtasks: normalizeSubtasks(task.subtasks),
        createdAt: task.createdAt || new Date().toISOString(),
        updatedAt: task.updatedAt || new Date().toISOString(),
      };
    })
    .filter(Boolean);
}

export function normalizeOption(value, validOptions, fallback) {
  return validOptions.includes(value) ? value : fallback;
}

export function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.map((tag) => String(tag).trim()).filter(Boolean);
}

export function normalizeSubtasks(subtasks) {
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

export function getTaskGroups(filteredTasks) {
  return TASK_GROUP_DEFINITIONS.map((group) => ({
    ...group,
    tasks: filteredTasks.filter((task) => getTaskGroupKey(task) === group.key),
  }));
}

export function getTaskGroupKey(task) {
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

export function getChecklistProgress(subtasks) {
  return {
    total: subtasks.length,
    done: subtasks.filter((subtask) => subtask.done).length,
  };
}

export function getDueDateText(task) {
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

export function getDifferenceInDays(dateString) {
  const today = getToday();
  const dueDate = createLocalDate(dateString);

  const differenceInTime = dueDate - today;
  return Math.round(differenceInTime / 86400000);
}

export function isOverdue(task) {
  if (task.status === "Concluída") {
    return false;
  }

  return getDifferenceInDays(task.dueDate) < 0;
}

export function getPriorityWeight(priority) {
  const weights = {
    Baixa: 1,
    Média: 2,
    Alta: 3,
  };

  return weights[priority] || 0;
}
