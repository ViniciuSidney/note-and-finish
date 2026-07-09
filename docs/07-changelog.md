# Changelog

## v0.2 - Experiência de uso e fluxo rápido

Status: Pronta para testes finais

### Adicionado
- Painel **Foco de hoje** com contagem de atividades atrasadas, para hoje e de alta prioridade.
- Painel **Indicadores** com resumo da agenda.
- Painéis do topo recolhíveis para liberar espaço para a listagem.
- Sistema de toasts para feedbacks rápidos.
- Ações rápidas de prazo com `+1 Dia` e `+1 Semana`, mostrando a nova data antes do clique.
- Rolagem automática até o card após adiamento de prazo.
- Adição de etapa ao checklist direto no card e no modal de detalhes.
- Exclusão de etapa do checklist no card e no modal de detalhes.
- Atalhos de data no formulário: Hoje, Amanhã e Semana que vem.
- Empty states contextuais para busca, filtros e lista vazia.
- Prévia inteligente do checklist nos cards, priorizando etapas pendentes.
- Link para abrir detalhes quando houver etapas ocultas na prévia.

### Alterado
- Tela inicial reorganizada com foco no uso diário.
- Botão **Nova atividade** movido para o cabeçalho da listagem.
- Blocos de prazo refinados visualmente sem alterar a lógica original.
- Modal de criação reorganizado em layout 30/70 no desktop.
- Modal de detalhes reorganizado para aproveitar melhor telas largas.
- Indicadores compactados em telas menores.
- Progresso do checklist compactado com `✅`.
- Campo visual **Matéria** renomeado para **Categoria**, mantendo compatibilidade interna dos dados.
- Versão visual da aplicação atualizada para `v0.2`.

### Corrigido
- Cards cortados dentro dos blocos de prazo.
- Rodapé de ações do modal de criação sobrepondo campos em algumas proporções de tela.
- Toasts aparecendo atrás do fundo escurecido dos modais.
- Alinhamento entre data de entrega e prioridade no modal de criação.
- Checklist do modal de detalhes crescendo demais quando há muitas etapas.

### Fora desta versão
- Histórico de conclusão de tarefas e etapas.
- Data de conclusão geral da tarefa.
- Customização das opções do campo Tipo.
- Duplicação de tarefas.
- Modo Foco dedicado.
