# Dados e Arquitetura

## Dados principais

### Entidade: Task / Atividade

Campos:
- `id`: identificador único da atividade.
- `title`: título da atividade.
- `type`: tipo da atividade. Valores atuais: Trabalho, Avaliação, Tarefa, Apresentação ou Outro.
- `subject`: categoria/contexto relacionado à atividade.
  - Observação: o nome interno permanece `subject` para manter compatibilidade com dados antigos; visualmente, o campo é exibido como **Categoria**.
- `dueDate`: data de entrega no formato `YYYY-MM-DD`.
- `priority`: prioridade. Valores esperados: Baixa, Média ou Alta.
- `status`: situação atual. Valores esperados: Pendente, Em andamento ou Concluída.
- `description`: descrição ou observações da atividade.
- `tags`: lista de etiquetas em texto.
- `subtasks`: lista de etapas/checklist.
- `createdAt`: data e horário de criação em ISO string.
- `updatedAt`: data e horário da última atualização em ISO string.

Exemplo:

```json
{
  "id": "task-123",
  "title": "Trabalho de História",
  "type": "Trabalho",
  "subject": "Escola",
  "dueDate": "2026-07-09",
  "priority": "Alta",
  "status": "Pendente",
  "description": "Fazer resumo e revisar antes da entrega.",
  "tags": ["grupo", "urgente"],
  "subtasks": [
    {
      "id": "subtask-1",
      "title": "Ler os textos",
      "done": false
    }
  ],
  "createdAt": "2026-07-08T10:00:00.000Z",
  "updatedAt": "2026-07-08T10:00:00.000Z"
}
```

### Entidade: Subtask / Etapa

Campos:
- `id`: identificador único da etapa.
- `title`: nome da etapa.
- `done`: indica se a etapa foi concluída.

Observação:
A v0.2 não registra data de conclusão de etapas. Essa melhoria fica para uma versão futura ligada a histórico/acompanhamento.

## Persistência

A aplicação usa `localStorage`.

Dados salvos:
- atividades cadastradas;
- preferência de tema;
- grupos recolhidos/expandidos;
- outros estados simples da interface quando necessário.

A exportação/importação usa JSON para permitir backup manual dos dados.

## Arquitetura de arquivos

### Estrutura geral

```text
src/
├── assets/
│   └── icons/
├── scripts/
│   ├── main.js
│   ├── app.js
│   └── features/
│       └── tasks/
├── styles/
│   ├── base/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── themes/
│   └── utilities/
└── templates/
```

### Feature de tarefas

```text
src/scripts/features/tasks/
├── tasks.actions.js
├── tasks.backup.js
├── tasks.constants.js
├── tasks.controller.js
├── tasks.dialogs.js
├── tasks.dom.js
├── tasks.empty-state.js
├── tasks.events.js
├── tasks.focus.js
├── tasks.form.js
├── tasks.inline-edit.js
├── tasks.model.js
├── tasks.render.js
├── tasks.storage.js
├── tasks.theme.js
├── tasks.toast.js
├── tasks.ui.js
└── tasks.utils.js
```

## Responsabilidades dos módulos JS

- `main.js`: ponto de entrada da aplicação.
- `app.js`: inicializa as features ativas.
- `tasks.controller.js`: orquestra a feature de tarefas e conecta os módulos.
- `tasks.dom.js`: centraliza seletores do DOM e valida elementos obrigatórios.
- `tasks.events.js`: registra eventos da feature.
- `tasks.form.js`: controla formulário de criação e edição.
- `tasks.actions.js`: executa ações de tarefa, grupos, etapas, detalhes e exclusão.
- `tasks.render.js`: renderiza indicadores, filtros e listagem.
- `tasks.ui.js`: monta HTML de cards, grupos, checklist e detalhes.
- `tasks.focus.js`: calcula e renderiza o painel Foco de hoje.
- `tasks.empty-state.js`: define mensagens de estados vazios.
- `tasks.toast.js`: exibe notificações rápidas.
- `tasks.model.js`: contém regras de dados, normalização, agrupamento e cálculos.
- `tasks.storage.js`: persiste e carrega dados do `localStorage`.
- `tasks.backup.js`: exporta e importa backups.
- `tasks.dialogs.js`: encapsula abertura e fechamento de dialogs/menus.
- `tasks.inline-edit.js`: controla edição inline.
- `tasks.theme.js`: controla tema claro/escuro.
- `tasks.constants.js`: centraliza constantes.
- `tasks.utils.js`: utilitários gerais.

## CSS

O CSS é separado por responsabilidade:

- `base`: tokens, reset e tipografia.
- `themes`: tema claro, escuro e tema-base da aplicação.
- `components`: botões, cards, modais, toasts, detalhes, badges, formulários etc.
- `layouts`: layouts estruturais como galeria, formulário e empty state.
- `pages`: estilos específicos da home.
- `utilities`: responsividade, scrollbar, helpers e estados.

## Decisões técnicas importantes

- O projeto usa HTML, CSS e JavaScript puro.
- IDs são usados como pontos de integração com JavaScript.
- Classes são usadas para aparência e estrutura visual.
- A aplicação não depende de backend.
- O `subject` interno foi mantido para compatibilidade, mesmo com o rótulo visual **Categoria**.
- As novas melhorias da v0.2 preservam o formato dos dados existentes.
- Histórico, datas de conclusão e customização de tipos ficaram fora da v0.2 para evitar inflar o modelo de dados.
