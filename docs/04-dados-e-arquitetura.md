# Dados e Arquitetura

## Dados principais

### Entidade: Task / Atividade

Campos:
- `id`: identificador único da atividade.
- `title`: título da atividade.
- `type`: tipo da atividade. Valores esperados: Trabalho, Avaliação, Tarefa, Apresentação ou Outro.
- `subject`: matéria ou área relacionada.
- `dueDate`: data de entrega no formato `YYYY-MM-DD`.
- `priority`: prioridade. Valores esperados: Baixa, Média ou Alta.
- `status`: situação atual. Valores esperados: Pendente, Em andamento ou Concluída.
- `description`: descrição ou observações da atividade.
- `tags`: lista de etiquetas em texto.
- `subtasks`: lista de subtarefas/checklist.
- `createdAt`: data e horário de criação em ISO string.
- `updatedAt`: data e horário da última atualização em ISO string.

Exemplo:

```json
{
  "id": "uuid-ou-id-gerado",
  "title": "Trabalho de Matemática",
  "type": "Trabalho",
  "subject": "Matemática",
  "dueDate": "2026-07-15",
  "priority": "Alta",
  "status": "Pendente",
  "description": "Resolver e entregar a lista.",
  "tags": ["escola", "urgente"],
  "subtasks": [
    {
      "id": "uuid-da-subtarefa",
      "title": "Resolver exercícios",
      "done": false
    }
  ],
  "createdAt": "2026-07-07T10:00:00.000Z",
  "updatedAt": "2026-07-07T10:00:00.000Z"
}
```

---

### Entidade: Subtask / Subtarefa

Campos:
- `id`: identificador único da subtarefa.
- `title`: título da etapa.
- `done`: indica se a etapa foi concluída.

---

### Entidade: Backup

Campos:
- `app`: nome da aplicação.
- `version`: versão do formato/exportação.
- `exportedAt`: data da exportação.
- `tasks`: lista de atividades exportadas.

---

## Relações entre dados

- Uma atividade possui zero ou várias subtarefas.
- Uma subtarefa pertence apenas a uma atividade.
- Uma atividade pode possuir zero ou várias etiquetas.
- Os grupos de prazo não são salvos como entidade; eles são calculados dinamicamente a partir de `dueDate` e `status`.
- Os estados de grupos recolhidos são salvos separadamente no `localStorage`.

---

## Persistência

A aplicação usa `localStorage`.

Chaves principais:
- `agenda-escolar-v1`: lista de atividades.
- `agenda-escolar-theme-v1`: preferência de tema.
- `agenda-escolar-group-collapse-v1`: grupos recolhidos.

Observação:
O projeto ainda usa chaves com o nome histórico “agenda-escolar”, pois a aplicação evoluiu a partir dessa base. Essa nomenclatura pode ser migrada futuramente, com cuidado para não perder dados existentes.

---

## Arquitetura geral

A aplicação é uma página web estática feita com:

- HTML;
- CSS modular;
- JavaScript puro com módulos ES;
- `localStorage` para persistência local.

Não há backend, banco de dados externo, autenticação ou dependências obrigatórias de framework.

---

## Estrutura de arquivos

```text
/
├── index.html
├── README.md
├── layout-preview.html
├── docs/
│   ├── 01-visao-do-projeto.md
│   ├── 02-requisitos-e-escopo.md
│   ├── 03-fluxos-e-telas.md
│   ├── 04-dados-e-arquitetura.md
│   ├── 05-roadmap.md
│   ├── 06-testes.md
│   ├── 07-changelog.md
│   └── x-refatoracao-js.md
└── src/
    ├── assets/
    ├── scripts/
    │   ├── main.js
    │   ├── app.js
    │   ├── core/
    │   ├── shared/
    │   └── features/
    │       └── tasks/
    │           ├── tasks.actions.js
    │           ├── tasks.backup.js
    │           ├── tasks.constants.js
    │           ├── tasks.controller.js
    │           ├── tasks.dialogs.js
    │           ├── tasks.dom.js
    │           ├── tasks.events.js
    │           ├── tasks.form.js
    │           ├── tasks.inline-edit.js
    │           ├── tasks.model.js
    │           ├── tasks.render.js
    │           ├── tasks.storage.js
    │           ├── tasks.theme.js
    │           ├── tasks.ui.js
    │           └── tasks.utils.js
    ├── styles/
    │   ├── base/
    │   ├── components/
    │   ├── layouts/
    │   ├── pages/
    │   ├── themes/
    │   ├── utilities/
    │   └── main.css
    └── templates/
```

---

## Responsabilidade dos principais arquivos JS

- `main.js`: ponto de entrada da aplicação.
- `app.js`: inicializa as features ativas.
- `tasks.controller.js`: orquestra a feature de tarefas.
- `tasks.dom.js`: centraliza seletores do DOM.
- `tasks.events.js`: registra os eventos da feature.
- `tasks.form.js`: controla formulário de criação/edição.
- `tasks.actions.js`: executa ações de tarefas, grupos, subtarefas, detalhes e exclusão.
- `tasks.render.js`: renderiza resumo, filtros e listagem.
- `tasks.ui.js`: monta HTML de cards, grupos, checklist e detalhes.
- `tasks.model.js`: contém regras de dados, normalização, agrupamento e cálculos.
- `tasks.storage.js`: lê e salva dados no `localStorage`.
- `tasks.backup.js`: exporta e importa backups.
- `tasks.dialogs.js`: encapsula abertura/fechamento de dialogs e menus.
- `tasks.inline-edit.js`: controla edição inline.
- `tasks.theme.js`: controla tema claro/escuro.
- `tasks.constants.js`: centraliza constantes.
- `tasks.utils.js`: utilitários gerais.

---

## Organização CSS

- `base/`: tokens, reset e tipografia.
- `themes/`: tema claro, escuro e variáveis da aplicação.
- `components/`: botões, cards, badges, modais, painéis, inputs, dropdowns, detalhes e edição inline.
- `layouts/`: layouts reutilizáveis, como galeria, formulário e empty state.
- `pages/`: ajustes específicos de páginas reais, como `home.css`.
- `utilities/`: helpers, scrollbar e responsividade.

---

## Observações técnicas

- IDs são usados para comportamento JavaScript.
- Classes são usadas para aparência e estrutura visual.
- A aplicação depende de `<script type="module">` para uso de imports ES Modules.
- O backup JSON substitui os dados atuais após confirmação.
- A importação normaliza dados para evitar quebra por campos ausentes ou inválidos.
