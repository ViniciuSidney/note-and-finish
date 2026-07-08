# Testes

## Informações

Projeto: Note and Finish  
Versão testada: v0.1 - Base funcional e arquitetura modular  
Data: 07/07/2026

---

## Testes principais

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| T01 | Abrir a aplicação | A interface deve carregar sem erros no console. | Pendente |
| T02 | Criar atividade com título e data | A atividade deve ser salva e aparecer no grupo correto. | Pendente |
| T03 | Tentar salvar sem título ou data | O sistema deve exibir mensagem de erro. | Pendente |
| T04 | Editar atividade pelo formulário | Os dados devem ser carregados e atualizados corretamente. | Pendente |
| T05 | Editar título inline | O título deve ser atualizado no card e salvo no localStorage. | Pendente |
| T06 | Editar descrição inline | A descrição deve ser atualizada e mantida após recarregar. | Pendente |
| T07 | Editar matéria inline | A matéria deve ser atualizada no badge. | Pendente |
| T08 | Editar tags inline | As etiquetas devem ser atualizadas e exibidas corretamente. | Pendente |
| T09 | Editar data inline | A data deve ser atualizada e a atividade pode mudar de grupo. | Pendente |
| T10 | Alterar tipo, prioridade e status por badge | O valor escolhido deve ser aplicado e salvo. | Pendente |
| T11 | Concluir atividade pelo card | A atividade deve ir para o grupo de concluídas. | Pendente |
| T12 | Reabrir atividade concluída | A atividade deve voltar ao grupo correspondente ao prazo. | Pendente |
| T13 | Excluir atividade pelo card | O modal de confirmação deve abrir e a tarefa deve ser removida após confirmar. | Pendente |
| T14 | Abrir modal de detalhes | O modal deve exibir todos os dados da atividade. | Pendente |
| T15 | Concluir/reabrir pelo modal de detalhes | O status deve ser alterado e refletido na lista. | Pendente |
| T16 | Excluir pelo modal de detalhes | O modal deve fechar e a atividade deve ser removida após confirmação. | Pendente |
| T17 | Criar checklist no formulário | As subtarefas devem aparecer no card e nos detalhes. | Pendente |
| T18 | Marcar subtarefa no card | O progresso do checklist deve atualizar. | Pendente |
| T19 | Marcar subtarefa nos detalhes | O progresso deve atualizar dentro do modal. | Pendente |
| T20 | Abrir e fechar checklist do card | A lista de subtarefas deve expandir/recolher corretamente. | Pendente |
| T21 | Abrir e fechar grupos de prazo | O grupo deve recolher/expandir e manter estado salvo. | Pendente |
| T22 | Buscar por título | A lista deve mostrar apenas atividades correspondentes. | Pendente |
| T23 | Buscar por matéria, descrição, tag ou subtarefa | A busca deve considerar esses campos. | Pendente |
| T24 | Filtrar por status | A lista deve respeitar o status escolhido. | Pendente |
| T25 | Filtrar por tipo | A lista deve respeitar o tipo escolhido. | Pendente |
| T26 | Ordenar por data crescente | Atividades devem aparecer da data mais próxima para a mais distante. | Pendente |
| T27 | Ordenar por data decrescente | Atividades devem aparecer da data mais distante para a mais próxima. | Pendente |
| T28 | Ordenar por prioridade | Atividades de maior prioridade devem aparecer antes. | Pendente |
| T29 | Ordenar por criação | Atividades mais recentes devem aparecer antes. | Pendente |
| T30 | Alternar tema claro/escuro | Tema deve mudar e preferência deve ser salva. | Pendente |
| T31 | Exportar backup | Deve baixar arquivo JSON com as atividades. | Pendente |
| T32 | Importar backup válido | Sistema deve mostrar resumo e importar após confirmação. | Pendente |
| T33 | Importar arquivo inválido | Sistema deve exibir mensagem de erro e não alterar dados. | Pendente |
| T34 | Apagar tudo sem digitar APAGAR | Botão deve permanecer bloqueado ou exibir erro. | Pendente |
| T35 | Apagar tudo digitando APAGAR | Todas as atividades devem ser removidas. | Pendente |
| T36 | Testar responsividade em mobile | Interface deve continuar utilizável em telas pequenas. | Pendente |
| T37 | Recarregar página após alterações | Dados salvos devem permanecer. | Pendente |

---

## Testes de regressão pós-refatoração

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| R01 | Verificar imports JS | A aplicação deve carregar os módulos sem erro. | Pendente |
| R02 | Verificar seletores obrigatórios do DOM | Nenhum erro de elemento obrigatório ausente deve aparecer. | Pendente |
| R03 | Verificar eventos principais | Todos os botões devem continuar respondendo. | Pendente |
| R04 | Verificar renderização dos grupos | Grupos devem ficar em coluna e cards dentro dos grupos. | Pendente |
| R05 | Verificar modais após modularização | Todos os dialogs devem abrir e fechar corretamente. | Pendente |

---

## Bugs encontrados

### Bug 1

Descrição:
Após a separação das ações JS, o painel de filtros gerou erro porque a função `toggleFiltersPanel` havia deixado de existir no controller.

Como reproduzir:
1. Abrir a aplicação após a refatoração.
2. Observar o console.
3. Tentar inicializar os eventos.

Status:
Corrigido.

---

### Bug 2

Descrição:
Após a separação de DOM/eventos, o fechamento do modal de criação gerou erro porque `closeCreateTaskDialogUi` era chamado no controller, mas não estava importado corretamente.

Como reproduzir:
1. Abrir a aplicação após a etapa de refatoração.
2. Abrir ou fechar o modal de criação.
3. Observar erro no console.

Status:
Corrigido.

---

## Observações

- Como a aplicação usa `localStorage`, recomenda-se testar com dados reais e também com armazenamento limpo.
- Antes de testar importação, exportar um backup válido para servir como arquivo de referência.
- Após mudanças estruturais, sempre verificar o console do navegador.
- Em testes destrutivos, exportar backup antes de usar “Apagar tudo”.
