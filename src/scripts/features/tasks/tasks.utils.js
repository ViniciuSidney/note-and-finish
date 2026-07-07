// =============================
// Tasks Utils
// File: features/tasks/tasks.utils.js
// =============================

export function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return String(Date.now() + Math.random());
}

export function createLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function formatDateTime(value) {
  if (!value) {
    return "Não registrado";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Não registrado";
  }

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(dateString) {
  if (!dateString) {
    return "Sem data";
  }

  const date = createLocalDate(dateString);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
