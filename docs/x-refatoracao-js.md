# Refatoração JS - Note and Finish

## Estrutura final da feature de tarefas

```text
src/scripts/
├── main.js
├── app.js
└── features/
    └── tasks/
        ├── tasks.actions.js
        ├── tasks.backup.js
        ├── tasks.constants.js
        ├── tasks.controller.js
        ├── tasks.dialogs.js
        ├── tasks.dom.js
        ├── tasks.events.js
        ├── tasks.form.js
        ├── tasks.inline-edit.js
        ├── tasks.model.js
        ├── tasks.render.js
        ├── tasks.storage.js
        ├── tasks.theme.js
        ├── tasks.ui.js
        └── tasks.utils.js
```

## Responsabilidades

- `main.js`: ponto de entrada da aplicação.
- `app.js`: inicializa as features ativas.
- `tasks.controller.js`: orquestra a feature de tarefas.
- `tasks.dom.js`: centraliza seletores do DOM e valida elementos obrigatórios.
- `tasks.events.js`: registra eventos.
- `tasks.form.js`: controla formulário de criação e edição.
- `tasks.actions.js`: executa ações de tarefa, grupos, subtarefas, detalhes e exclusão.
- `tasks.render.js`: renderiza resumo, filtros e listagem.
- `tasks.ui.js`: monta HTML de cards, grupos, checklist e detalhes.
- `tasks.model.js`: contém regras de dados, normalização, agrupamento e cálculos.
- `tasks.storage.js`: persiste e carrega dados do localStorage.
- `tasks.backup.js`: exporta e importa backups.
- `tasks.dialogs.js`: encapsula abertura e fechamento de dialogs/menus.
- `tasks.inline-edit.js`: controla edição inline.
- `tasks.theme.js`: controla tema claro/escuro.
- `tasks.constants.js`: centraliza constantes.
- `tasks.utils.js`: utilitários gerais.

## Checklist de teste final

- Criar atividade.
- Editar atividade pelo formulário.
- Fechar modal de criação.
- Editar título inline.
- Editar descrição inline.
- Editar matéria, tags e data inline.
- Alterar tipo, prioridade e status nos badges.
- Abrir e fechar filtros.
- Buscar por título, descrição, matéria, tags e subtarefas.
- Ordenar por data, prioridade e criação.
- Abrir e fechar grupos.
- Abrir e fechar checklist.
- Marcar e desmarcar subtarefas no card.
- Abrir detalhes.
- Marcar e desmarcar subtarefas nos detalhes.
- Concluir e reabrir atividade.
- Excluir pelo card.
- Excluir pelo modal de detalhes.
- Alternar tema claro/escuro.
- Exportar backup.
- Importar backup válido.
- Testar importação inválida.
- Apagar tudo com confirmação `APAGAR`.
