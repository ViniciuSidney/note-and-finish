# Roadmap

## Versão atual

### v0.1 - Base funcional e arquitetura modular

Status: Em estabilização final

Objetivo:
Entregar uma versão funcional do Note and Finish com cadastro, organização, edição, filtros, checklist, backup, tema e arquitetura modular em CSS e JavaScript.

Funcionalidades:
- Cadastro de atividades.
- Edição pelo formulário.
- Edição inline nos cards.
- Organização por grupos de prazo.
- Cards de resumo no topo.
- Busca, filtros e ordenação.
- Checklist de subtarefas.
- Modal de detalhes.
- Tema claro/escuro.
- Backup por exportação e importação JSON.
- Apagar tudo com confirmação dupla.
- Refatoração CSS por responsabilidades.
- Refatoração JS por módulos da feature de tarefas.

Critérios para fechar a versão:
- Fluxo de criação funcionando sem erro.
- Edição inline funcionando em todos os campos previstos.
- Filtros e busca funcionando corretamente.
- Checklist funcionando no card e nos detalhes.
- Backup exportando e importando corretamente.
- Tema claro/escuro funcionando.
- Exclusão individual e exclusão total funcionando com confirmação.
- Testes manuais principais concluídos.
- Documentação inicial preenchida.

---

## Próximas versões

### v0.2 - Experiência de uso e fluxo rápido

Status: Planejada

Objetivo:
Tornar o uso diário da aplicação mais agradável, rápido e orientado, sem inflar a interface com funcionalidades grandes demais.

Ideia central:
A v0.2 deve reduzir atrito, melhorar feedbacks visuais e ajudar o usuário a entender rapidamente o que precisa fazer primeiro.

Funcionalidades planejadas:

#### 1. Painel “Foco de hoje”
- Criar um painel compacto no topo da tela com um resumo prático do dia.
- Destacar atividades atrasadas, atividades para hoje e atividades de prioridade alta.
- Exibir uma orientação curta, por exemplo:
  - “Comece pelas atrasadas.”
  - “Você tem 3 atividades para hoje.”
  - “Há uma atividade de alta prioridade pendente.”

#### 2. Ações rápidas nos cards
- Adicionar ações rápidas para mudar o prazo de uma tarefa sem abrir o formulário completo.
- Primeiras ações previstas:
  - Adiar para amanhã.
  - Adiar para próxima semana.
- Manter as ações discretas para não poluir o card.

#### 3. Adicionar etapa ao checklist em tarefa existente
- Permitir adicionar uma nova etapa ao checklist de uma tarefa já criada.
- A ação deve ficar disponível diretamente no card, de forma inline.
- Fluxo esperado:
  1. O usuário clica em “+ etapa” ou botão semelhante no checklist do card.
  2. Um campo pequeno aparece no próprio card.
  3. O usuário digita o nome da etapa.
  4. Ao confirmar, a etapa é adicionada ao checklist da tarefa.
- A funcionalidade também pode ser replicada no modal de detalhes, caso fique natural.
- A tarefa não deve exigir reabrir o formulário completo apenas para adicionar uma etapa.

#### 4. Toasts de feedback
- Criar notificações leves para ações rápidas.
- Exemplos:
  - “Atividade criada.”
  - “Atividade concluída.”
  - “Prazo alterado para amanhã.”
  - “Etapa adicionada ao checklist.”
  - “Backup exportado.”

#### 5. Empty states mais inteligentes
- Melhorar mensagens quando não houver tarefas ou quando os filtros não encontrarem resultados.
- Exemplos:
  - “Nenhuma atividade encontrada com esses filtros.”
  - “Tudo limpo por aqui. Cadastre sua próxima atividade.”
  - “Você concluiu tudo deste grupo.”

#### 6. Refinamento do modal de detalhes
- Melhorar a leitura das informações da tarefa.
- Destacar status, prazo, prioridade e progresso do checklist.
- Manter ações principais acessíveis:
  - Editar.
  - Concluir/reabrir.
  - Excluir.
  - Adicionar etapa ao checklist, se fizer sentido no modal.

#### 7. Microcopy e acabamento visual
- Ajustar textos pequenos da interface para orientar melhor o usuário.
- Revisar rótulos de botões, mensagens de erro e mensagens de confirmação.
- Manter a interface simples, amigável e consistente.

Critérios para fechar a versão:
- Painel “Foco de hoje” funcionando com dados reais das atividades.
- Ações de adiamento funcionando corretamente.
- Nova etapa de checklist podendo ser adicionada em tarefa já criada.
- Toasts exibindo feedbacks sem atrapalhar o fluxo.
- Empty states mais úteis e claros.
- Modal de detalhes mais legível.
- Testes manuais das ações rápidas concluídos.

Fora do escopo da v0.2:
- Login.
- Sincronização em nuvem.
- Calendário completo.
- Notificações reais do navegador.
- Sistema complexo de recorrência.
- Relatórios avançados.

---

### v0.3 - Histórico e acompanhamento simples

Status: Planejada

Objetivo:
Aumentar a utilidade da aplicação para acompanhar mudanças importantes nas atividades ao longo do tempo.

Funcionalidades planejadas:
- Histórico simples de alterações por atividade.
- Registro de conclusão/reabertura.
- Registro de alterações importantes, como prazo, status e prioridade.
- Registro de adição e conclusão de etapas do checklist.
- Melhor visualização de atividades recentemente modificadas.
- Possível seção de “últimas alterações”.

Observação:
Essa versão deve continuar simples. O histórico não precisa ser um sistema complexo de auditoria, apenas um apoio para o usuário entender o que mudou.

---

### v0.4 - Dashboard e análise simples

Status: Planejada

Objetivo:
Melhorar a visualização geral do desempenho e da carga de tarefas.

Funcionalidades planejadas:
- Dashboard com distribuição por status.
- Quantidade de atividades por prioridade.
- Quantidade de atividades por tipo.
- Atividades atrasadas em destaque.
- Indicadores simples de progresso.
- Resumo semanal simples.
- Quantidade de atividades concluídas no período.

Observação:
O dashboard deve ser útil para leitura rápida, sem virar uma tela pesada ou cheia de gráficos desnecessários.

---

### v0.5 - Organização avançada

Status: Planejada

Objetivo:
Aprimorar a forma como o usuário organiza atividades por contexto.

Funcionalidades planejadas:
- Melhorias no sistema de etiquetas.
- Possível filtro por matéria com maior destaque.
- Arquivamento de atividades antigas.
- Visualização de atividades por matéria/categoria.
- Melhorias no gerenciamento de concluídas.
- Possível duplicação de tarefa.
- Possíveis templates simples de tarefa.

---

### v0.6 - Experiência mobile e PWA

Status: Planejada

Objetivo:
Melhorar o uso em dispositivos móveis e avaliar instalação como aplicativo.

Funcionalidades planejadas:
- Refinamentos de responsividade.
- Melhorias de toque em botões e menus.
- Ajustes de modais em telas pequenas.
- Manifest PWA.
- Ícones da aplicação.
- Possível funcionamento offline estruturado.

---

### v1.0 - Primeira versão estável

Status: Futura

Objetivo:
Considerar o projeto minimamente completo para uso contínuo pessoal.

Critérios para fechar a versão:
- Funcionalidades principais estáveis.
- Interface consistente em desktop e mobile.
- Backup confiável.
- Código modular e documentado.
- Testes manuais documentados.
- Roadmap das próximas melhorias definido.
- Fluxo principal agradável para uso real.

---

## Ideias futuras

- Sincronização entre dispositivos.
- Integração com calendário.
- Notificações reais.
- Importação/exportação em outros formatos.
- Estatísticas por período.
- Modo foco para atividades prioritárias.
- Templates de atividades recorrentes.
- Suporte a tarefas recorrentes.
- Melhorias de acessibilidade.
- Configurações mais completas.
- Atalhos de teclado.
- Modo compacto dos cards.
- Visualização por calendário simples.
