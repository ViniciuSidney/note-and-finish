// =============================
// Tasks Empty State
// File: features/tasks/tasks.empty-state.js
// =============================

const DEFAULT_SORT = "dateAsc";

function getEmptyStateParts(emptyState) {
  return {
    icon: emptyState.querySelector(".empty-state-icon"),
    title: emptyState.querySelector(".empty-state-title"),
    description: emptyState.querySelector(".empty-state-description"),
    actions: emptyState.querySelector(".empty-state-actions"),
  };
}

function ensureClearFiltersButton(actions) {
  if (!actions) {
    return null;
  }

  let button = actions.querySelector('[data-action="clear-empty-state-filters"]');

  if (button) {
    return button;
  }

  button = document.createElement("button");
  button.type = "button";
  button.className = "button button-secondary empty-state-clear-button";
  button.dataset.action = "clear-empty-state-filters";
  button.textContent = "Limpar filtros";

  actions.prepend(button);

  return button;
}

function getEmptyStateContent({ tasks, filteredTasks, searchTerm, selectedStatus, selectedType }) {
  const hasTasks = tasks.length > 0;
  const hasFilteredTasks = filteredTasks.length > 0;
  const hasSearch = Boolean(searchTerm);
  const hasStatusFilter = selectedStatus !== "Todos";
  const hasTypeFilter = selectedType !== "Todos";
  const hasActiveFilters = hasSearch || hasStatusFilter || hasTypeFilter;

  if (hasFilteredTasks) {
    return {
      visible: false,
      showClearFilters: false,
    };
  }

  if (!hasTasks) {
    return {
      visible: true,
      icon: "📭",
      title: "Tudo limpo por aqui.",
      description: "Cadastre sua primeira atividade para começar a organizar sua rotina.",
      showClearFilters: false,
    };
  }

  if (hasSearch) {
    return {
      visible: true,
      icon: "🔎",
      title: `Nada encontrado para “${searchTerm}”.`,
      description: "Tente buscar por outro termo ou limpe os filtros para ver suas atividades novamente.",
      showClearFilters: true,
    };
  }

  if (selectedStatus === "Concluída") {
    return {
      visible: true,
      icon: "✅",
      title: "Nenhuma atividade concluída ainda.",
      description: "Quando finalizar uma atividade, ela aparecerá aqui para consulta.",
      showClearFilters: true,
    };
  }

  if (selectedStatus === "Pendente") {
    return {
      visible: true,
      icon: "🌿",
      title: "Sem atividades pendentes.",
      description: "Você não tem tarefas pendentes nesse filtro. Aproveite para revisar as concluídas ou criar uma nova atividade.",
      showClearFilters: true,
    };
  }

  if (selectedStatus === "Em andamento") {
    return {
      visible: true,
      icon: "🛠️",
      title: "Nada em andamento agora.",
      description: "Marque uma atividade como em andamento quando quiser destacar o que já começou.",
      showClearFilters: true,
    };
  }

  if (hasTypeFilter) {
    return {
      visible: true,
      icon: "🗂️",
      title: `Nenhuma atividade do tipo “${selectedType}”.`,
      description: "Tente escolher outro tipo ou limpe os filtros para voltar à listagem completa.",
      showClearFilters: true,
    };
  }

  if (hasActiveFilters) {
    return {
      visible: true,
      icon: "🔎",
      title: "Nenhuma atividade encontrada com esses filtros.",
      description: "Ajuste a busca, mude os filtros ou limpe a seleção atual.",
      showClearFilters: true,
    };
  }

  return {
    visible: true,
    icon: "📭",
    title: "Nenhuma atividade para exibir.",
    description: "Crie uma nova atividade ou ajuste os filtros para encontrar o que procura.",
    showClearFilters: true,
  };
}

export function renderEmptyState(elements, state) {
  const { emptyState } = elements;

  if (!emptyState) {
    return;
  }

  const content = getEmptyStateContent(state);

  emptyState.classList.toggle("is-visible", content.visible);

  if (!content.visible) {
    return;
  }

  const parts = getEmptyStateParts(emptyState);

  if (parts.icon) {
    parts.icon.textContent = content.icon;
  }

  if (parts.title) {
    parts.title.textContent = content.title;
  }

  if (parts.description) {
    parts.description.textContent = content.description;
  }

  const clearFiltersButton = ensureClearFiltersButton(parts.actions);

  if (clearFiltersButton) {
    clearFiltersButton.hidden = !content.showClearFilters;
  }
}

export function hasActiveListFilters(elements) {
  return Boolean(elements.searchInput.value.trim()) || elements.statusFilter.value !== "Todos" || elements.typeFilter.value !== "Todos";
}

export function clearListFilters(elements) {
  elements.searchInput.value = "";
  elements.statusFilter.value = "Todos";
  elements.typeFilter.value = "Todos";
  elements.sortFilter.value = DEFAULT_SORT;
  elements.searchInput.focus();
}
