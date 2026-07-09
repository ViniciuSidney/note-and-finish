// =============================
// Tasks Toasts
// File: features/tasks/tasks.toast.js
// =============================

const TOAST_DEFAULT_DURATION = 3200;
const TOAST_MAX_VISIBLE = 4;

const TOAST_ICONS = {
  success: "✅",
  error: "⚠️",
  warning: "💡",
  info: "✨",
};

function getToastContainer(container) {
  if (container) {
    return container;
  }

  const existingContainer = document.querySelector("#toastContainer");

  if (existingContainer) {
    return existingContainer;
  }

  const createdContainer = document.createElement("div");
  createdContainer.id = "toastContainer";
  createdContainer.className = "toast-container";
  createdContainer.setAttribute("aria-live", "polite");
  createdContainer.setAttribute("aria-atomic", "false");

  document.body.appendChild(createdContainer);

  return createdContainer;
}

export function createToastController({ container, duration = TOAST_DEFAULT_DURATION } = {}) {
  const toastContainer = getToastContainer(container);
  const defaultToastParent = toastContainer.parentElement || document.body;

  function getToastHost() {
    const openedDialogs = Array.from(document.querySelectorAll("dialog[open]"));
    const activeDialog = openedDialogs.at(-1);

    return activeDialog?.querySelector(".dialog-content") || defaultToastParent;
  }

  function syncToastContainerHost() {
    const nextHost = getToastHost();

    if (toastContainer.parentElement !== nextHost) {
      nextHost.appendChild(toastContainer);
    }
  }

  function dismissToast(toast) {
    if (!toast || toast.dataset.removing === "true") {
      return;
    }

    toast.dataset.removing = "true";
    toast.classList.remove("is-visible");

    const removeToast = () => toast.remove();

    toast.addEventListener("transitionend", removeToast, { once: true });
    window.setTimeout(removeToast, 260);
  }

  function limitVisibleToasts() {
    const visibleToasts = Array.from(toastContainer.querySelectorAll(".toast"));

    if (visibleToasts.length <= TOAST_MAX_VISIBLE) {
      return;
    }

    visibleToasts.slice(0, visibleToasts.length - TOAST_MAX_VISIBLE).forEach(dismissToast);
  }

  function showToast(message, type = "info", options = {}) {
    if (!message) {
      return null;
    }

    const toastType = TOAST_ICONS[type] ? type : "info";
    const toastDuration = Number.isFinite(options.duration) ? options.duration : duration;

    syncToastContainerHost();

    const toast = document.createElement("div");
    toast.className = `toast toast-${toastType}`;
    toast.setAttribute("role", toastType === "error" ? "alert" : "status");

    const icon = document.createElement("span");
    icon.className = "toast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = TOAST_ICONS[toastType];

    const text = document.createElement("span");
    text.className = "toast-message";
    text.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "toast-close";
    closeButton.setAttribute("aria-label", "Fechar notificação");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", () => dismissToast(toast));

    toast.append(icon, text, closeButton);
    toastContainer.appendChild(toast);

    limitVisibleToasts();

    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    if (toastDuration > 0) {
      window.setTimeout(() => dismissToast(toast), toastDuration);
    }

    return toast;
  }

  function dismissAllToasts() {
    toastContainer.querySelectorAll(".toast").forEach(dismissToast);
  }

  return {
    showToast,
    dismissToast,
    dismissAllToasts,
  };
}
