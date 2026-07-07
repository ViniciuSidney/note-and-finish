// =============================
// Tasks Constants
// File: features/tasks/tasks.constants.js
// =============================

export const STORAGE_KEY = "agenda-escolar-v1";
export const THEME_STORAGE_KEY = "agenda-escolar-theme-v1";
export const BACKUP_FILE_PREFIX = "agenda-escolar-backup";
export const GROUP_COLLAPSE_STORAGE_KEY = "agenda-escolar-group-collapse-v1";

export const TYPE_OPTIONS = ["Trabalho", "Avaliação", "Tarefa", "Apresentação", "Outro"];
export const PRIORITY_OPTIONS = ["Baixa", "Média", "Alta"];
export const STATUS_OPTIONS = ["Pendente", "Em andamento", "Concluída"];

export const INLINE_SELECT_OPTIONS = {
  type: TYPE_OPTIONS,
  priority: PRIORITY_OPTIONS,
  status: STATUS_OPTIONS,
};

export const TASK_GROUP_DEFINITIONS = [
  {
    key: "overdue",
    title: "Atrasadas",
    description: "Atividades pendentes que já passaram da data de entrega.",
    icon: "⚠️",
  },
  {
    key: "today",
    title: "Hoje",
    description: "Compromissos que precisam de atenção ainda hoje.",
    icon: "📌",
  },
  {
    key: "tomorrow",
    title: "Amanhã",
    description: "Atividades com prazo para o próximo dia.",
    icon: "🌤️",
  },
  {
    key: "week",
    title: "Esta semana",
    description: "Atividades pendentes com vencimento nos próximos 7 dias.",
    icon: "🗓️",
  },
  {
    key: "future",
    title: "Futuras",
    description: "Demandas com prazo mais distante.",
    icon: "📚",
  },
  {
    key: "completed",
    title: "Concluídas",
    description: "Atividades finalizadas e mantidas no histórico.",
    icon: "✅",
  },
];
