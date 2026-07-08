# Requisitos e Escopo

## Requisitos funcionais

- RF01 - O sistema deve permitir cadastrar uma nova atividade com título, tipo, matéria, data de entrega, prioridade, status, descrição, subtarefas e etiquetas.
- RF02 - O sistema deve permitir editar uma atividade existente pelo formulário principal/modal.
- RF03 - O sistema deve permitir editar informações diretamente nos cards por meio de edição inline.
- RF04 - O sistema deve permitir excluir uma atividade individualmente com confirmação.
- RF05 - O sistema deve permitir marcar uma atividade como concluída ou reabri-la.
- RF06 - O sistema deve permitir criar e acompanhar subtarefas/checklists dentro de uma atividade.
- RF07 - O sistema deve permitir marcar e desmarcar subtarefas como concluídas.
- RF08 - O sistema deve organizar automaticamente as atividades em grupos de prazo: atrasadas, hoje, amanhã, esta semana, futuras e concluídas.
- RF09 - O sistema deve permitir abrir e fechar grupos de atividades.
- RF10 - O sistema deve permitir abrir e fechar a prévia do checklist nos cards.
- RF11 - O sistema deve permitir buscar atividades por título, matéria, descrição, etiquetas e subtarefas.
- RF12 - O sistema deve permitir filtrar atividades por status e tipo.
- RF13 - O sistema deve permitir ordenar atividades por data, prioridade ou criação.
- RF14 - O sistema deve exibir contadores/resumos de total de atividades, pendentes, próximas da semana e concluídas.
- RF15 - O sistema deve permitir visualizar os detalhes completos de uma atividade em modal.
- RF16 - O sistema deve permitir alternar entre tema claro e tema escuro.
- RF17 - O sistema deve salvar os dados localmente no navegador.
- RF18 - O sistema deve permitir exportar backup das atividades em arquivo JSON.
- RF19 - O sistema deve permitir importar backup válido em JSON.
- RF20 - O sistema deve permitir apagar todos os dados apenas após confirmação explícita.

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

## Escopo da versão atual

### Entra nesta versão

- Cadastro completo de atividades.
- Edição de atividades pelo formulário.
- Edição inline nos cards.
- Organização automática por grupos de prazo.
- Filtros, busca e ordenação.
- Cards com prioridade, status, tipo, matéria, etiquetas e descrição.
- Checklist de subtarefas.
- Modal de detalhes da atividade.
- Tema claro e escuro.
- Exportação e importação de backup JSON.
- Apagar todos os dados com confirmação.
- Refatoração visual em CSS modular.
- Refatoração JavaScript em feature modular.

### Fica para versões futuras

- Histórico de alterações por atividade.
- Dashboard mais detalhado com estatísticas e gráficos simples.
- Notificações visuais mais avançadas para prazos próximos.
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
