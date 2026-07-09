# Requisitos e Escopo

## Requisitos funcionais

- RF01 - O sistema deve permitir cadastrar uma nova atividade com título, tipo, categoria, data de entrega, prioridade, status, descrição, etapas de checklist e etiquetas.
- RF02 - O sistema deve permitir editar uma atividade existente pelo formulário/modal.
- RF03 - O sistema deve permitir editar informações diretamente nos cards por meio de edição inline.
- RF04 - O sistema deve permitir excluir uma atividade individualmente com confirmação.
- RF05 - O sistema deve permitir marcar uma atividade como concluída ou reabri-la.
- RF06 - O sistema deve permitir criar e acompanhar etapas de checklist dentro de uma atividade.
- RF07 - O sistema deve permitir adicionar etapa de checklist em uma atividade já criada, pelo card e pelo modal de detalhes.
- RF08 - O sistema deve permitir excluir etapa de checklist pelo card e pelo modal de detalhes.
- RF09 - O sistema deve permitir marcar e desmarcar etapas como concluídas.
- RF10 - O sistema deve organizar automaticamente as atividades em grupos de prazo: atrasadas, hoje, amanhã, esta semana, futuras e concluídas.
- RF11 - O sistema deve permitir abrir e fechar grupos de atividades.
- RF12 - O sistema deve permitir abrir e fechar a prévia do checklist nos cards.
- RF13 - O sistema deve exibir uma prévia inteligente do checklist, priorizando etapas pendentes.
- RF14 - O sistema deve permitir buscar atividades por título, categoria, descrição, etiquetas e etapas.
- RF15 - O sistema deve permitir filtrar atividades por status e tipo.
- RF16 - O sistema deve permitir ordenar atividades por data, prioridade ou criação.
- RF17 - O sistema deve exibir indicadores de total de atividades, pendentes, próximas da semana e concluídas.
- RF18 - O sistema deve exibir um painel de foco com atividades atrasadas, para hoje e de alta prioridade.
- RF19 - O sistema deve permitir recolher/expandir os painéis Foco de hoje e Indicadores.
- RF20 - O sistema deve permitir visualizar os detalhes completos de uma atividade em modal.
- RF21 - O sistema deve permitir alternar entre tema claro e tema escuro.
- RF22 - O sistema deve salvar os dados localmente no navegador.
- RF23 - O sistema deve permitir exportar backup das atividades em arquivo JSON.
- RF24 - O sistema deve permitir importar backup válido em JSON.
- RF25 - O sistema deve permitir apagar todos os dados apenas após confirmação explícita.
- RF26 - O sistema deve exibir toasts de feedback para ações importantes.
- RF27 - O sistema deve permitir adiar prazos rapidamente em `+1 Dia` e `+1 Semana`, exibindo a nova data antes do clique.
- RF28 - O sistema deve rolar até o card quando uma ação rápida mover a atividade de bloco.
- RF29 - O sistema deve oferecer atalhos de data no formulário: hoje, amanhã e semana que vem.

## Requisitos não funcionais

- RNF01 - A aplicação deve ser responsiva.
- RNF02 - A interface deve ser simples, clara e visualmente consistente.
- RNF03 - Os dados devem ser salvos localmente por meio do `localStorage`.
- RNF04 - A aplicação deve carregar rapidamente.
- RNF05 - A aplicação deve funcionar sem backend e sem dependências externas obrigatórias.
- RNF06 - O código deve ser organizado em arquivos modulares.
- RNF07 - O CSS deve ser separado por responsabilidade: base, temas, componentes, layouts, páginas e utilidades.
- RNF08 - O JavaScript deve ser separado por feature e responsabilidade.
- RNF09 - A aplicação deve preservar dados importantes durante edições e importações válidas.
- RNF10 - A aplicação deve evitar ações destrutivas acidentais por meio de confirmações.
- RNF11 - Os toasts devem aparecer acima de modais e overlays.
- RNF12 - Os modais devem aproveitar bem o espaço horizontal em telas grandes e continuar utilizáveis em telas menores.
- RNF13 - A aplicação deve manter compatibilidade com dados salvos em versões anteriores.

## Escopo da versão atual - v0.2

### Entra nesta versão

- Tela inicial reorganizada.
- Painel **Foco de hoje**.
- Painel **Indicadores**.
- Painéis do topo recolhíveis.
- Cadastro completo de atividades.
- Edição de atividades pelo formulário.
- Edição inline nos cards.
- Organização automática por grupos de prazo.
- Filtros, busca e ordenação.
- Cards com prioridade, status, tipo, categoria, etiquetas e descrição.
- Checklist de etapas.
- Adição de etapa pelo card e pelo modal de detalhes.
- Exclusão de etapa pelo card e pelo modal de detalhes.
- Prévia inteligente do checklist.
- Ações rápidas de prazo.
- Modal de detalhes da atividade refinado.
- Modal de criação/edição refinado em layout 30/70 no desktop.
- Empty states contextuais.
- Toasts de feedback.
- Tema claro e escuro.
- Exportação e importação de backup JSON.
- Apagar todos os dados com confirmação.
- Favicon da aplicação.
- Refatoração visual em CSS modular.
- Refatoração JavaScript em feature modular.

### Fica para versões futuras

- Histórico de alterações por atividade.
- Data de conclusão geral da tarefa.
- Data de conclusão de cada etapa do checklist.
- Dashboard mais detalhado com estatísticas e gráficos simples.
- Customização das opções do campo Tipo.
- Duplicação de tarefas.
- Modo Foco dedicado.
- Melhorias no sistema de etiquetas/categorias.
- Possibilidade de arquivar atividades antigas.
- Melhorias de acessibilidade e navegação por teclado.
- PWA/instalação no dispositivo.
- Sincronização entre dispositivos, caso o projeto evolua para backend.

### Fora do escopo

- Login de usuários.
- Banco de dados online.
- Compartilhamento de tarefas entre pessoas.
- Integração com calendário externo.
- Sistema de permissões.
- Aplicativo mobile nativo.
- Notificações push reais.
