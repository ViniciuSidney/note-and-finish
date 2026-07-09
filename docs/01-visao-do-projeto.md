# Visão do Projeto

## Nome do projeto

Note and Finish

## Versão atual

**v0.2 - Experiência de uso e fluxo rápido**

Status: **fechada**

## Ideia principal

O **Note and Finish** é uma aplicação web simples e local para organizar atividades, tarefas escolares, trabalhos, avaliações e compromissos pessoais. A proposta é permitir que o usuário cadastre atividades com prazo, prioridade, status, categoria, etiquetas, descrição e checklist de etapas, acompanhando tudo em uma tela clara, rápida e agradável.

A aplicação funciona diretamente no navegador, sem necessidade de conta, servidor ou banco de dados externo. Os dados são salvos localmente no dispositivo do usuário por meio do `localStorage`.

## Problema que resolve

O projeto busca resolver a dificuldade de acompanhar várias atividades ao mesmo tempo, especialmente quando há trabalhos, avaliações, apresentações, tarefas e prazos diferentes.

Sem uma organização visual simples, é comum que tarefas importantes sejam esquecidas, atrasadas ou misturadas com compromissos menos urgentes. O Note and Finish centraliza essas informações e ajuda o usuário a enxergar o que precisa ser feito primeiro.

## Objetivo principal

Fornecer uma agenda visual e prática para que o usuário consiga:

- registrar atividades importantes;
- visualizar prazos por período;
- acompanhar tarefas atrasadas, pendentes, em andamento e concluídas;
- dividir atividades em etapas de checklist;
- adicionar e remover etapas sem reabrir o formulário completo;
- adiar prazos rapidamente;
- filtrar, buscar e ordenar tarefas;
- receber feedback visual por toasts;
- manter backup dos dados;
- usar a aplicação com uma interface leve, responsiva e agradável.

## Público-alvo

O público principal são estudantes que precisam organizar atividades escolares, avaliações, trabalhos e tarefas do dia a dia.

Também pode ser útil para qualquer pessoa que queira uma aplicação simples de organização pessoal, sem depender de plataformas complexas, login ou contas externas.

## Diferencial da aplicação

O diferencial do Note and Finish é unir uma interface simples com recursos suficientes para uso real:

- organização por grupos de prazo: atrasadas, hoje, amanhã, esta semana, futuras e concluídas;
- painel **Foco de hoje** para orientar o próximo passo;
- painel **Indicadores** com resumo rápido da agenda;
- painéis do topo recolhíveis para liberar espaço para a listagem;
- edição inline diretamente nos cards;
- ações rápidas de prazo com `+1 Dia` e `+1 Semana`;
- checklist de etapas dentro das atividades;
- adição e remoção de etapas pelo card e pelo modal de detalhes;
- prévia inteligente do checklist, priorizando etapas pendentes;
- tema claro e escuro;
- backup por arquivo JSON;
- confirmação segura para apagar todos os dados;
- favicon próprio;
- arquitetura modular em HTML, CSS e JavaScript puro.

## Escopo da versão atual

A v0.2 consolidou a experiência de uso e fluxo rápido da aplicação. O foco foi reduzir atrito, melhorar feedbacks visuais e deixar a tela principal mais orientada ao uso diário.

## Observações

A aplicação foi pensada como um projeto web estático, executado diretamente no navegador, com foco em simplicidade, autonomia e organização pessoal.

Nesta fase, o projeto não utiliza backend, autenticação, banco de dados externo ou sincronização entre dispositivos. Essas possibilidades podem ser avaliadas futuramente, mas não fazem parte da proposta central da versão atual.
