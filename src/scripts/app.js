// =============================
// App
// File: app.js
// =============================

import { initTasksFeature } from "./features/tasks/tasks.controller.js";

export function initApp() {
  initTasksFeature();
}
