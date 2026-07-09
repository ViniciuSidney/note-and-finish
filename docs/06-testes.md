# Testes

## Versão testada

**v0.2 - Experiência de uso e fluxo rápido**

Status geral: **Aprovada nos testes manuais principais**

## Objetivo dos testes

Garantir que o fluxo principal da aplicação funcione após a refatoração estrutural e as melhorias de experiência da v0.2.

## Testes funcionais principais

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| T01 | Carregar aplicação | A tela deve carregar sem erros no console. | Aprovado |
| T02 | Criar atividade com título e data | A atividade deve ser salva e aparecer no grupo correto. | Aprovado |
| T03 | Tentar salvar sem título ou data | O sistema deve exibir mensagem de erro/toast. | Aprovado |
| T04 | Editar atividade pelo formulário | Os dados devem ser carregados e atualizados corretamente. | Aprovado |
| T05 | Editar título inline | O título deve ser atualizado no card e salvo no localStorage. | Aprovado |
| T06 | Editar descrição inline | A descrição deve ser atualizada e mantida após recarregar. | Aprovado |
| T07 | Editar categoria inline | A categoria deve ser atualizada no badge. | Aprovado |
| T08 | Editar tags inline | As etiquetas devem ser atualizadas e exibidas corretamente. | Aprovado |
| T09 | Editar data inline | A data deve ser atualizada e a atividade pode mudar de grupo. | Aprovado |
| T10 | Alterar tipo, prioridade e status por badge | O valor escolhido deve ser aplicado e salvo. | Aprovado |
| T11 | Concluir atividade pelo card | A atividade deve ir para o grupo de concluídas. | Aprovado |
| T12 | Reabrir atividade concluída | A atividade deve voltar ao grupo correspondente ao prazo. | Aprovado |
| T13 | Excluir atividade pelo card | O modal de confirmação deve abrir e a tarefa deve ser removida após confirmar. | Aprovado |
| T14 | Abrir modal de detalhes | O modal deve exibir todos os dados da atividade. | Aprovado |
| T15 | Concluir/reabrir pelo modal de detalhes | O status deve ser alterado e refletido na lista. | Aprovado |
| T16 | Excluir pelo modal de detalhes | O modal deve fechar e a atividade deve ser removida após confirmação. | Aprovado |
| T17 | Criar checklist no formulário | As etapas devem aparecer no card e nos detalhes. | Aprovado |
| T18 | Marcar etapa no card | O progresso do checklist deve atualizar. | Aprovado |
| T19 | Marcar etapa nos detalhes | O progresso deve atualizar dentro do modal. | Aprovado |
| T20 | Abrir e fechar checklist do card | A lista de etapas deve expandir/recolher corretamente. | Aprovado |
| T21 | Adicionar etapa pelo card | A etapa deve ser criada e salva. | Aprovado |
| T22 | Adicionar etapa nos detalhes | A etapa deve ser criada e salva. | Aprovado |
| T23 | Excluir etapa pelo card | A etapa deve ser removida e o progresso atualizado. | Aprovado |
| T24 | Excluir etapa nos detalhes | A etapa deve ser removida e o progresso atualizado. | Aprovado |
| T25 | Abrir e fechar grupos de prazo | O grupo deve recolher/expandir e manter estado salvo. | Aprovado |
| T26 | Buscar por título | A lista deve mostrar apenas atividades correspondentes. | Aprovado |
| T27 | Buscar por categoria, descrição, tag ou etapa | A busca deve considerar esses campos. | Aprovado |
| T28 | Filtrar por status | A lista deve respeitar o status escolhido. | Aprovado |
| T29 | Filtrar por tipo | A lista deve respeitar o tipo escolhido. | Aprovado |
| T30 | Ordenar por data crescente | Atividades devem aparecer da data mais próxima para a mais distante. | Aprovado |
| T31 | Ordenar por data decrescente | Atividades devem aparecer da data mais distante para a mais próxima. | Aprovado |
| T32 | Ordenar por prioridade | Atividades de maior prioridade devem aparecer antes. | Aprovado |
| T33 | Ordenar por criação | Atividades mais recentes devem aparecer antes. | Aprovado |
| T34 | Adiar tarefa em +1 Dia | Prazo deve ser alterado e card deve mudar de bloco se necessário. | Aprovado |
| T35 | Adiar tarefa em +1 Semana | Prazo deve ser alterado e card deve mudar de bloco se necessário. | Aprovado |
| T36 | Alternar tema claro/escuro | Tema deve mudar e preferência deve ser salva. | Aprovado |
| T37 | Exportar backup | Deve baixar arquivo JSON com as atividades. | Aprovado |
| T38 | Importar backup válido | Sistema deve mostrar resumo e importar após confirmação. | Aprovado |
| T39 | Importar arquivo inválido | Sistema deve exibir mensagem de erro e não alterar dados. | Aprovado |
| T40 | Apagar tudo sem digitar APAGAR | Botão deve permanecer bloqueado ou exibir erro. | Aprovado |
| T41 | Apagar tudo digitando APAGAR | Todas as atividades devem ser removidas. | Aprovado |
| T42 | Testar responsividade em mobile | Interface deve continuar utilizável em telas pequenas. | Aprovado |
| T43 | Testar modal de criação entre 910px e 821px | Campos não devem cortar ou sobrepor. | Aprovado |
| T44 | Recarregar página após alterações | Dados salvos devem permanecer. | Aprovado |
| T45 | Ver favicon | Ícone deve aparecer na guia do navegador. | Aprovado |

## Testes de regressão pós-refatoração

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| R01 | Verificar imports JS | A aplicação deve carregar os módulos sem erro. | Aprovado |
| R02 | Verificar seletores obrigatórios do DOM | Nenhum erro de elemento obrigatório ausente deve aparecer. | Aprovado |
| R03 | Verificar eventos principais | Todos os botões devem continuar respondendo. | Aprovado |
| R04 | Verificar renderização dos grupos | Grupos devem ficar em coluna e cards dentro dos grupos. | Aprovado |
| R05 | Verificar modais após modularização | Todos os dialogs devem abrir e fechar corretamente. | Aprovado |
| R06 | Verificar toasts | Toasts devem aparecer em ações relevantes e acima de modais. | Aprovado |
| R07 | Verificar armazenamento local | Dados devem permanecer após recarregar. | Aprovado |

## Bugs corrigidos durante a v0.2

### Bug 1 - Função de filtros ausente

Descrição:
Após a separação das ações JS, o painel de filtros gerou erro porque a função `toggleFiltersPanel` havia deixado de existir no controller.

Status: Corrigido.

### Bug 2 - Fechamento do modal de criação

Descrição:
Após a separação de DOM/eventos, o fechamento do modal de criação gerou erro porque `closeCreateTaskDialogUi` era chamado no controller, mas não estava importado corretamente.

Status: Corrigido.

### Bug 3 - Cards cortados dentro dos blocos

Descrição:
Após o redesign da home, cards dentro dos blocos de prazo ficaram cortados por regras de overflow.

Status: Corrigido.

### Bug 4 - Rodapé do modal de criação sobrepondo campos

Descrição:
Em algumas proporções de tela, os botões de ação do modal de criação ficavam no meio do fluxo dos campos.

Status: Corrigido.

### Bug 5 - Responsividade entre 910px e 821px

Descrição:
O layout 30/70 do modal de criação ficava comprimido e causava corte nos campos.

Status: Corrigido.

## Observações

- Como a aplicação usa `localStorage`, recomenda-se testar com dados reais e também com armazenamento limpo.
- Antes de testar importação, exportar um backup válido para servir como arquivo de referência.
- Após mudanças estruturais, sempre verificar o console do navegador.
- Em testes destrutivos, exportar backup antes de usar “Apagar tudo”.
