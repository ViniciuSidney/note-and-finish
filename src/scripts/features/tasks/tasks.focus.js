// =============================
// Tasks Focus Panel
// File: features/tasks/tasks.focus.js
// =============================

import { getDifferenceInDays } from "./tasks.model.js";

function getPluralText(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

function getFocusSummary(tasks) {
  const pendingTasks = tasks.filter((task) => task.status !== "Concluída");
  const overdueTasks = pendingTasks.filter((task) => getDifferenceInDays(task.dueDate) < 0);
  const todayTasks = pendingTasks.filter((task) => getDifferenceInDays(task.dueDate) === 0);
  const highPriorityTasks = pendingTasks.filter((task) => task.priority === "Alta");

  if (!pendingTasks.length) {
    return {
      title: "Tudo limpo por aqui",
      message: "Você não tem atividades pendentes no momento. Cadastre a próxima quando surgir.",
      overdueCount: 0,
      todayCount: 0,
      highPriorityCount: 0,
      state: "clear",
    };
  }

  if (overdueTasks.length) {
    return {
      title: "Comece pelas atrasadas",
      message: `Você tem ${overdueTasks.length} ${getPluralText(overdueTasks.length, "atividade atrasada", "atividades atrasadas")}. Resolver isso primeiro reduz a pressão do resto da rotina.`,
      overdueCount: overdueTasks.length,
      todayCount: todayTasks.length,
      highPriorityCount: highPriorityTasks.length,
      state: "overdue",
    };
  }

  if (todayTasks.length) {
    return {
      title: "Hoje pede atenção",
      message: `Você tem ${todayTasks.length} ${getPluralText(todayTasks.length, "atividade", "atividades")} para hoje. Foque no que vence antes de puxar novas tarefas.`,
      overdueCount: 0,
      todayCount: todayTasks.length,
      highPriorityCount: highPriorityTasks.length,
      state: "today",
    };
  }

  if (highPriorityTasks.length) {
    return {
      title: "Prioridade alta no radar",
      message: `Há ${highPriorityTasks.length} ${getPluralText(highPriorityTasks.length, "atividade de alta prioridade", "atividades de alta prioridade")} pendente. Vale separar um bloco de tempo para ela.`,
      overdueCount: 0,
      todayCount: 0,
      highPriorityCount: highPriorityTasks.length,
      state: "priority",
    };
  }

  return {
    title: "Ritmo controlado",
    message: `Você tem ${pendingTasks.length} ${getPluralText(pendingTasks.length, "atividade pendente", "atividades pendentes")}, mas nenhuma urgência imediata. Bom momento para adiantar algo pequeno.`,
    overdueCount: 0,
    todayCount: 0,
    highPriorityCount: 0,
    state: "calm",
  };
}

export function renderTodayFocusPanel(elements, tasks) {
  if (!elements.todayFocusPanel) {
    return;
  }

  const summary = getFocusSummary(tasks);

  elements.todayFocusPanel.dataset.focusState = summary.state;
  elements.todayFocusTitle.textContent = summary.title;
  elements.todayFocusMessage.textContent = summary.message;
  elements.todayFocusOverdueCount.textContent = summary.overdueCount;
  elements.todayFocusTodayCount.textContent = summary.todayCount;
  elements.todayFocusHighCount.textContent = summary.highPriorityCount;
}
