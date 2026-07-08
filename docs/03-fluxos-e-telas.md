# Fluxos e Telas

## Telas principais

### Tela 1 - Tela principal / Home

Objetivo:
Permitir que o usuário acompanhe suas atividades, visualize resumos, acesse filtros, crie novas atividades e interaja com os cards.

Elementos:
- Cabeçalho com nome da aplicação e menu de opções.
- Cards de resumo: total, pendentes, próximas da semana e concluídas.
- Botão para criar nova atividade.
- Barra de ações/filtros.
- Lista de atividades agrupadas por prazo.
- Estado vazio quando não há atividades ou resultados.

Ações do usuário:
- Abrir menu de opções.
- Alternar tema claro/escuro.
- Exportar backup.
- Importar backup.
- Apagar todos os dados.
- Abrir filtros.
- Buscar, filtrar e ordenar atividades.
- Criar nova atividade.
- Abrir, concluir/reabrir ou excluir uma atividade.
- Editar campos diretamente no card.
- Abrir/fechar grupos de prazo.
- Abrir/fechar checklist do card.

Estados importantes:
- Estado vazio: exibe mensagem orientando o usuário a criar a primeira atividade.
- Estado com dados: exibe grupos de atividades com cards organizados por prazo.
- Estado filtrado sem resultados: exibe empty state informando que não há atividades correspondentes.
- Estado de erro: mensagens aparecem no formulário quando há importação inválida ou cadastro incompleto.

---

### Tela 2 - Modal de criação/edição de atividade

Objetivo:
Permitir cadastrar uma nova atividade ou editar uma atividade existente com todos os seus campos principais.

Elementos:
- Campo de título.
- Campo de tipo.
- Campo de matéria.
- Campo de data de entrega.
- Campo de prioridade.
- Campo de status.
- Campo de descrição.
- Campo de subtarefas/checklist.
- Campo de etiquetas.
- Botões de salvar, limpar e fechar.
- Área de mensagens do formulário.

Ações do usuário:
- Preencher dados da atividade.
- Salvar nova atividade.
- Atualizar atividade existente.
- Limpar formulário.
- Fechar modal.

Estados importantes:
- Estado de criação: título do modal indica nova atividade e botão salva o cadastro.
- Estado de edição: campos são preenchidos com os dados da atividade selecionada.
- Estado de erro: aparece quando título ou data não são preenchidos.
- Estado de sucesso: aparece após cadastro ou atualização.

---

### Tela 3 - Cards de atividades

Objetivo:
Exibir as informações essenciais de cada atividade e permitir ações rápidas.

Elementos:
- Título editável.
- Badges editáveis de tipo, matéria, prioridade, status e etiquetas.
- Descrição editável.
- Checklist recolhível.
- Data editável.
- Botões de ver, concluir/reabrir e excluir.

Ações do usuário:
- Editar campos inline.
- Marcar atividade como concluída.
- Reabrir atividade concluída.
- Abrir detalhes.
- Excluir atividade.
- Abrir checklist.
- Marcar subtarefas.

Estados importantes:
- Card atrasado: recebe destaque visual de atraso.
- Card concluído: recebe aparência mais suave e título riscado.
- Checklist recolhido: mostra apenas progresso.
- Checklist expandido: mostra subtarefas visíveis.

---

### Tela 4 - Modal de detalhes da atividade

Objetivo:
Mostrar uma ficha completa da atividade selecionada.

Elementos:
- Cabeçalho com título, tipo, matéria e prazo.
- Badges de prioridade e status.
- Cards de prazo, prioridade e status.
- Progresso do checklist.
- Lista completa de subtarefas.
- Descrição.
- Etiquetas.
- Registro de criação e atualização.
- Ações de concluir/reabrir e excluir.

Ações do usuário:
- Visualizar detalhes completos.
- Marcar/desmarcar subtarefas.
- Concluir ou reabrir atividade.
- Excluir atividade.
- Fechar modal.

Estados importantes:
- Sem subtarefas: informa que nenhuma etapa foi adicionada.
- Sem descrição: mostra mensagem padrão.
- Sem etiquetas: mostra mensagem padrão.

---

### Tela 5 - Menu de opções

Objetivo:
Concentrar ações gerais da aplicação.

Elementos:
- Botão de alternar tema.
- Botão de exportar backup.
- Botão de importar backup.
- Botão de apagar todos os dados.

Ações do usuário:
- Abrir/fechar menu.
- Trocar tema.
- Exportar dados.
- Selecionar arquivo de importação.
- Abrir confirmação para apagar tudo.

Estados importantes:
- Menu fechado: ações ficam ocultas.
- Menu aberto: ações aparecem em dropdown.

---

### Tela 6 - Modais de confirmação

Objetivo:
Evitar ações destrutivas acidentais.

Elementos:
- Modal de exclusão individual.
- Modal de importação de backup.
- Modal de apagar todos os dados.

Ações do usuário:
- Confirmar ou cancelar exclusão.
- Confirmar ou cancelar importação.
- Digitar `APAGAR` para liberar exclusão total.

Estados importantes:
- Confirmação bloqueada: botão permanece desabilitado até o texto correto.
- Confirmação liberada: botão é habilitado e mensagem de confirmação aparece.

---

## Fluxos principais

### Fluxo 1 - Criar atividade

1. Usuário acessa a tela principal.
2. Usuário clica em “Nova atividade”.
3. Sistema abre o modal de criação.
4. Usuário preenche título, data e demais campos desejados.
5. Usuário clica em salvar.
6. Sistema valida os campos obrigatórios.
7. Sistema salva a atividade no `localStorage`.
8. Sistema fecha o modal e atualiza a listagem.

---

### Fluxo 2 - Editar atividade inline

1. Usuário localiza uma atividade na listagem.
2. Usuário clica em um campo editável do card.
3. Sistema abre o campo de edição ou menu de seleção.
4. Usuário altera o valor.
5. Sistema salva a alteração ao confirmar, selecionar opção ou sair do campo.
6. Sistema atualiza a listagem e mantém os dados no `localStorage`.

---

### Fluxo 3 - Marcar atividade como concluída

1. Usuário clica no botão de concluir no card ou no modal de detalhes.
2. Sistema altera o status para “Concluída”.
3. Sistema atualiza a data de modificação.
4. Sistema salva os dados.
5. Sistema move a atividade para o grupo de concluídas.

---

### Fluxo 4 - Usar filtros e busca

1. Usuário abre o painel de filtros.
2. Usuário digita um termo de busca ou escolhe filtros.
3. Sistema recalcula a lista visível.
4. Sistema exibe apenas atividades correspondentes.
5. Se não houver resultados, sistema exibe estado vazio.

---

### Fluxo 5 - Exportar backup

1. Usuário abre o menu de opções.
2. Usuário clica em exportar backup.
3. Sistema gera um arquivo JSON com as atividades.
4. Navegador baixa o arquivo com data no nome.

---

### Fluxo 6 - Importar backup

1. Usuário abre o menu de opções.
2. Usuário clica em importar backup.
3. Usuário escolhe um arquivo JSON.
4. Sistema valida e normaliza os dados.
5. Sistema mostra resumo da importação.
6. Usuário confirma.
7. Sistema substitui os dados atuais pelos dados importados.
8. Sistema atualiza a tela.

---

### Fluxo 7 - Apagar todos os dados

1. Usuário abre o menu de opções.
2. Usuário clica em apagar tudo.
3. Sistema abre modal de confirmação.
4. Usuário digita `APAGAR`.
5. Sistema libera o botão de confirmação.
6. Usuário confirma.
7. Sistema remove todas as atividades do `localStorage`.
8. Sistema atualiza a tela para estado vazio.
