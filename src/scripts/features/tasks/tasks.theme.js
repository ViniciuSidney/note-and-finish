// =============================
// Tasks Theme
// File: features/tasks/tasks.theme.js
// =============================

import { THEME_STORAGE_KEY } from "./tasks.constants.js";

export function initializeTheme(elements) {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = savedTheme || (prefersDarkTheme ? "dark" : "light");

  applyTheme(initialTheme, elements);
}

export function applyTheme(theme, elements) {
  const { themeToggleButton, themeIcon, themeText } = elements;
  const isDarkTheme = theme === "dark";

  document.body.dataset.theme = theme;

  themeIcon.textContent = isDarkTheme ? "☀️" : "🌙";
  themeText.textContent = isDarkTheme ? "Tema claro" : "Tema escuro";

  themeToggleButton.setAttribute("aria-label", isDarkTheme ? "Ativar tema claro" : "Ativar tema escuro");
}

export function toggleTheme(elements) {
  const currentTheme = document.body.dataset.theme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme, elements);

  return nextTheme;
}
