# Changelog

Todas as mudanças importantes deste projeto serão registradas aqui.

---

## [v0.1] - 07/07/2026

### Adicionado

- Estrutura inicial da aplicação Note and Finish.
- Cadastro de atividades com título, tipo, matéria, prazo, prioridade, status, descrição, subtarefas e etiquetas.
- Listagem de atividades em cards.
- Organização automática por grupos de prazo: atrasadas, hoje, amanhã, esta semana, futuras e concluídas.
- Cards de resumo com total, pendentes, próximas da semana e concluídas.
- Filtros por status e tipo.
- Busca por título, tipo, matéria, descrição, subtarefas e etiquetas.
- Ordenação por data, prioridade e criação.
- Checklist de subtarefas no card e nos detalhes.
- Modal de criação/edição de atividade.
- Modal de visualização completa da atividade.
- Modal de confirmação para exclusão individual.
- Modal de importação de backup.
- Modal de apagar todos os dados com confirmação por texto.
- Tema claro e escuro.
- Persistência local com `localStorage`.
- Exportação de backup em JSON.
- Importação de backup em JSON.
- Edição inline de título, descrição, matéria, tags e data.
- Seleção inline de tipo, prioridade e status.
- Estado recolhido/expandido dos grupos.
- Estado recolhido/expandido do checklist.
- Documentação inicial do projeto.

### Alterado

- Repaginação da tela principal para uma experiência mais visual e organizada.
- Criação do modal wide de atividade para melhor uso do espaço.
- Melhoria da listagem de cards com grupos e galeria interna.
- Ajustes de responsividade para desktop, tablet e mobile.
- Reorganização completa do CSS por responsabilidades:
  - base;
  - temas;
  - componentes;
  - layouts;
  - páginas;
  - utilidades.
- Reorganização completa do JavaScript em módulos da feature `tasks`.
- Separação de responsabilidades no JS:
  - ações;
  - backup;
  - constantes;
  - controller;
  - dialogs;
  - DOM;
  - eventos;
  - formulário;
  - edição inline;
  - modelo;
  - renderização;
  - storage;
  - tema;
  - UI;
  - utilitários.

### Corrigido

- Correção de comportamento visual dos cards após separação do layout de galeria.
- Correção do estilo do header do checklist após mover estilos para arquivos específicos.
- Correção de erro causado pela ausência da função `toggleFiltersPanel` após refatoração.
- Correção de erro causado por import ausente de `closeCreateTaskDialogUi`.
- Ajustes para evitar que grupos de tarefas fiquem lado a lado indevidamente.
- Ajustes de scrollbars internas em listas e modais.
- Ajustes de tema escuro em componentes movidos para arquivos separados.

### Removido

- Dependência do antigo JS monolítico concentrado em um único arquivo.
- Duplicações de CSS em `home.css`.
- Estilos de componentes que estavam misturados com estilos específicos da página.
- Responsabilidades de DOM e eventos do controller principal.

---

## Próximas mudanças planejadas

### v0.2 - Histórico e acompanhamento

- Histórico de alterações por atividade.
- Registro de eventos importantes, como criação, conclusão, reabertura e mudança de prazo.
- Melhor visualização de atividades modificadas recentemente.
- Possível seção de “últimas alterações”.

### v0.3 - Dashboard

- Indicadores de tarefas por status, prioridade e tipo.
- Melhor visão geral de produtividade e atrasos.
- Cards de análise simples.
