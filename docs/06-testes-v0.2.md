# Testes manuais - v0.2

## Objetivo

Validar as funcionalidades adicionadas e refinadas na v0.2 do Note and Finish.

## Ambiente sugerido

- Navegador desktop atual.
- Testar tema claro e tema escuro.
- Testar armazenamento limpo e com dados existentes.
- Testar larguras aproximadas: desktop grande, 980px, 821px, 768px, 425px.

## Checklist principal

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| V02-01 | Abrir aplicação | Carrega sem erro no console. | Aprovado |
| V02-02 | Ver versão visual | Tag deve exibir `v0.2`. | Aprovado |
| V02-03 | Ver favicon | Ícone aparece ao lado do título da guia. | Aprovado |
| V02-04 | Painel Foco de hoje sem tarefas | Mostra mensagem neutra/organização. | Aprovado |
| V02-05 | Painel Foco de hoje com tarefa atrasada | Mostra orientação para começar pelas atrasadas. | Aprovado |
| V02-06 | Painel Foco de hoje com tarefa para hoje | Mostra contagem de hoje corretamente. | Aprovado |
| V02-07 | Painel Foco de hoje com alta prioridade | Mostra alta prioridade corretamente. | Aprovado |
| V02-08 | Recolher/expandir Foco de hoje | Mantém título/mensagem visíveis e recolhe métricas. | Aprovado |
| V02-09 | Recolher/expandir Indicadores | Mantém título/descrição visíveis e recolhe cards. | Aprovado |
| V02-10 | Indicadores em tela pequena | Cards ficam compactos, rótulo à esquerda e número à direita. | Aprovado |
| V02-11 | Criar atividade | Atividade é salva e aparece no grupo correto. | Aprovado |
| V02-12 | Usar atalho Hoje no formulário | Campo de data recebe a data atual. | Aprovado |
| V02-13 | Usar atalho Amanhã no formulário | Campo de data recebe o dia seguinte. | Aprovado |
| V02-14 | Usar atalho Semana que vem | Campo de data recebe data +7 dias. | Aprovado |
| V02-15 | Modal de criação em desktop | Layout 30/70 fica organizado e sem cortes. | Aprovado |
| V02-16 | Modal de criação entre 910px e 821px | Campos não sobrepõem nem cortam. | Aprovado |
| V02-17 | Modal de criação em mobile | Campos empilham corretamente. | Aprovado |
| V02-18 | Campo Categoria | Rótulo visual aparece como Categoria. | Aprovado |
| V02-19 | Editar atividade | Dados são carregados e atualizados corretamente. | Aprovado |
| V02-20 | Adiar em +1 Dia | Prazo muda com base na data atual da tarefa. | Aprovado |
| V02-21 | Adiar em +1 Semana | Prazo muda com base na data atual da tarefa. | Aprovado |
| V02-22 | Ver nova data nos botões de adiamento | Botão mostra a data resultante antes do clique. | Aprovado |
| V02-23 | Rolar até card adiado | Aplicação rola até o card no novo grupo. | Aprovado |
| V02-24 | Toast após adiar | Toast aparece com mensagem clara. | Aprovado |
| V02-25 | Toast com modal aberto | Toast fica visível acima do fundo escurecido. | Aprovado |
| V02-26 | Adicionar etapa pelo card | Etapa é adicionada e salva. | Aprovado |
| V02-27 | Adicionar etapa pelos detalhes | Etapa é adicionada e salva. | Aprovado |
| V02-28 | Tentar adicionar etapa vazia | Sistema impede e mostra feedback. | Aprovado |
| V02-29 | Tentar adicionar etapa repetida | Sistema impede e mostra feedback. | Aprovado |
| V02-30 | Excluir etapa pelo card | Etapa é removida e progresso atualiza. | Aprovado |
| V02-31 | Excluir etapa pelos detalhes | Etapa é removida e progresso atualiza. | Aprovado |
| V02-32 | Checklist com mais de 4 etapas nos detalhes | Lista usa rolagem interna. | Aprovado |
| V02-33 | Prévia inteligente do checklist | Etapas pendentes aparecem primeiro na prévia. | Aprovado |
| V02-34 | Clicar em etapas ocultas no detalhe | Modal de detalhes abre corretamente. | Aprovado |
| V02-35 | Progresso do checklist | Usa formato compacto com `✅`. | Aprovado |
| V02-36 | Empty state sem tarefas | Mensagem inicial é útil e clara. | Aprovado |
| V02-37 | Empty state com busca sem resultado | Mensagem contextual aparece. | Aprovado |
| V02-38 | Botão limpar filtros no empty state | Limpa filtros e renderiza lista. | Aprovado |
| V02-39 | Abrir/fechar blocos de prazo | Blocos mantêm comportamento esperado. | Aprovado |
| V02-40 | Cards dentro dos blocos | Cards não ficam cortados e listagem rola normalmente. | Aprovado |
| V02-41 | Tema claro/escuro | Tema muda e preferência é mantida. | Aprovado |
| V02-42 | Exportar backup | Arquivo JSON é gerado. | Aprovado |
| V02-43 | Importar backup válido | Dados são importados após confirmação. | Aprovado |
| V02-44 | Importar backup inválido | Dados atuais são preservados e erro aparece. | Aprovado |
| V02-45 | Apagar tudo com confirmação | Dados são removidos apenas após digitar `APAGAR`. | Aprovado |

## Observação

Os testes foram considerados aprovados após a rodada final de ajustes da v0.2, incluindo correção de responsividade do modal de criação e adição do favicon.
