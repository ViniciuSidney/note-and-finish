// =============================
// Tasks Storage
// File: features/tasks/tasks.storage.js
// =============================

import { GROUP_COLLAPSE_STORAGE_KEY, STORAGE_KEY } from "./tasks.constants.js";

export function loadTasks() {
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

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadCollapsedGroupKeys() {
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

export function saveCollapsedGroupKeys(collapsedGroupKeys) {
  localStorage.setItem(GROUP_COLLAPSE_STORAGE_KEY, JSON.stringify([...collapsedGroupKeys]));
}
