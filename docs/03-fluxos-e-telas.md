# Fluxos e Telas

## Telas principais

### Tela 1 - Tela principal / Home

Objetivo:
Permitir que o usuário acompanhe suas atividades, visualize o foco do dia, consulte indicadores, acesse filtros, crie novas atividades e interaja com os cards.

Elementos:
- Cabeçalho com nome da aplicação, versão e menu de opções.
- Painel **Foco de hoje** com alerta principal e métricas de atraso, hoje e alta prioridade.
- Painel **Indicadores** com total, pendentes, próximos 7 dias e concluídas.
- Botões para recolher/expandir os painéis do topo.
- Cabeçalho do painel **Minhas atividades** com botão de nova atividade e filtros.
- Lista de atividades agrupadas por prazo.
- Estado vazio contextual quando não há atividades ou resultados.

Ações do usuário:
- Abrir menu de opções.
- Alternar tema claro/escuro.
- Exportar backup.
- Importar backup.
- Apagar todos os dados.
- Recolher/expandir Foco de hoje.
- Recolher/expandir Indicadores.
- Abrir filtros.
- Buscar, filtrar e ordenar atividades.
- Criar nova atividade.
- Abrir, concluir/reabrir ou excluir uma atividade.
- Editar campos diretamente no card.
- Adiar atividade em `+1 Dia` ou `+1 Semana`.
- Abrir/fechar grupos de prazo.
- Abrir/fechar checklist do card.

Estados importantes:
- Estado vazio inicial: exibe mensagem orientando o usuário a criar a primeira atividade.
- Estado com dados: exibe grupos de atividades com cards organizados por prazo.
- Estado filtrado sem resultados: exibe empty state com opção de limpar filtros.
- Estado com tarefas urgentes: Foco de hoje destaca atrasos, tarefas para hoje ou alta prioridade.
- Estado com painéis recolhidos: mantém título/descrição úteis visíveis e libera espaço para a listagem.

---

### Tela 2 - Modal de criação/edição de atividade

Objetivo:
Permitir cadastrar uma nova atividade ou editar uma atividade existente com todos os seus campos principais.

Elementos:
- Campo de título.
- Campo de tipo.
- Campo de categoria.
- Campo de data de entrega.
- Atalhos de data: hoje, amanhã e semana que vem.
- Campo de prioridade.
- Campo de status.
- Campo de descrição.
- Campo de checklist/etapas.
- Campo de etiquetas.
- Botões de salvar, limpar e fechar.
- Área de mensagens do formulário.

Organização visual:
- Em telas grandes, o modal usa layout 30/70:
  - coluna esquerda: título, tipo, categoria, prioridade e status;
  - coluna direita: data, atalhos, descrição, checklist e etiquetas.
- Em telas menores, o formulário empilha os campos para preservar leitura e toque.

Ações do usuário:
- Preencher dados da atividade.
- Usar atalhos de data.
- Salvar nova atividade.
- Atualizar atividade existente.
- Limpar formulário.
- Fechar modal.

Estados importantes:
- Estado de criação: título do modal indica nova atividade e botão salva o cadastro.
- Estado de edição: campos são preenchidos com os dados da atividade selecionada.
- Estado de erro: aparece quando título ou data não são preenchidos.
- Estado de sucesso: aparece após cadastro ou atualização, com toast.

---

### Tela 3 - Cards de atividades

Objetivo:
Exibir as informações essenciais de cada atividade e permitir ações rápidas.

Elementos:
- Título editável.
- Badges editáveis de tipo, categoria, prioridade, status e etiquetas.
- Descrição editável.
- Checklist recolhível.
- Prévia inteligente do checklist.
- Data editável.
- Botões de ver, concluir/reabrir e excluir.
- Botões de adiar prazo em `+1 Dia` e `+1 Semana`.

Ações do usuário:
- Editar campos inline.
- Marcar atividade como concluída.
- Reabrir atividade concluída.
- Abrir detalhes.
- Excluir atividade.
- Abrir checklist.
- Marcar/desmarcar etapas.
- Adicionar etapa ao checklist.
- Excluir etapa do checklist.
- Abrir detalhes pelo link de etapas ocultas.
- Adiar prazo rapidamente.

Estados importantes:
- Card atrasado: recebe destaque visual de atraso.
- Card concluído: recebe aparência mais suave e título riscado.
- Checklist recolhido: mostra apenas progresso compacto.
- Checklist expandido: mostra etapas visíveis e ações.
- Checklist com muitas etapas: prévia prioriza etapas pendentes.
- Card adiado: após mudar de bloco, a tela rola até ele e aplica destaque visual.

---

### Tela 4 - Modal de detalhes da atividade

Objetivo:
Mostrar uma ficha completa da atividade selecionada e permitir ações principais sem voltar ao formulário.

Elementos:
- Cabeçalho com título, tipo, categoria e prazo.
- Badges de prioridade e status.
- Cards de prazo, prioridade e status.
- Progresso do checklist.
- Lista completa de etapas.
- Ação para adicionar etapa.
- Ação para remover etapa.
- Descrição.
- Etiquetas.
- Registro de criação/atualização.
- Ações: editar, concluir/reabrir, adiar e excluir.

Ações do usuário:
- Visualizar todos os dados da atividade.
- Marcar/desmarcar etapas.
- Adicionar etapa.
- Remover etapa.
- Editar atividade.
- Concluir/reabrir atividade.
- Adiar prazo.
- Excluir atividade.
- Fechar modal.

Estados importantes:
- Atividade sem descrição: exibe mensagem amigável.
- Atividade sem checklist: permite adicionar primeira etapa.
- Checklist longo: usa rolagem interna para evitar crescimento excessivo do modal.
- Toasts: aparecem acima do fundo escurecido do modal.

---

### Tela 5 - Menu de opções

Objetivo:
Agrupar ações gerais da aplicação.

Elementos:
- Alternância de tema.
- Exportar backup.
- Importar backup.
- Apagar tudo.

Ações do usuário:
- Trocar tema.
- Exportar dados.
- Importar dados.
- Abrir confirmação de exclusão total.

---

### Tela 6 - Modais auxiliares

Objetivo:
Confirmar ações sensíveis e operações de dados.

Modais:
- Confirmação de exclusão individual.
- Importação de backup.
- Apagar tudo com confirmação digitando `APAGAR`.

Estados importantes:
- Importação válida: mostra resumo antes de substituir os dados.
- Importação inválida: exibe erro e mantém dados atuais.
- Apagar tudo: exige confirmação explícita.
