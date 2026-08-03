# Note and Finish

> **Transforme atividades espalhadas em próximos passos claros.**

O **Note and Finish** é uma aplicação web local-first para organizar atividades, prazos, prioridades e etapas em um fluxo visual de acompanhamento e conclusão.

A aplicação centraliza tarefas escolares e pessoais, ajuda o usuário a identificar o que precisa de atenção e transforma uma lista dispersa de compromissos em uma rotina mais compreensível.

## Acesso

* [Abrir aplicação publicada](https://viniciusidney.github.io/note-and-finish/)

## Estado atual

| Informação       | Estado                            |
| ---------------- | --------------------------------- |
| Versão           | `v0.2`                            |
| Ciclo            | Experiência de uso e fluxo rápido |
| Status da versão | Concluída                         |
| Armazenamento    | Local no navegador                |
| Backend          | Não utilizado                     |

A versão `v0.2` foi concluída após testes funcionais, testes de regressão e validações de responsividade.

O projeto continua em evolução, com os próximos ciclos documentados no roadmap.

## Problema

Atividades, avaliações, trabalhos e compromissos costumam ficar distribuídos entre anotações, mensagens, calendários e lembranças informais.

Quando não existe uma estrutura clara, tarefas importantes podem ser esquecidas, atrasadas ou misturadas com itens menos urgentes.

## Solução

O Note and Finish reúne essas informações em uma única interface e permite:

* visualizar o que está atrasado ou próximo do prazo;
* identificar prioridades;
* dividir atividades em etapas menores;
* acompanhar o progresso;
* editar informações sem interromper o fluxo;
* adiar prazos rapidamente;
* preservar os dados por backup;
* encontrar o próximo passo com menos esforço.

## Funcionalidades

### Organização de atividades

* criação, edição e exclusão de atividades;
* título, descrição, tipo e categoria;
* data de entrega;
* prioridade;
* status;
* etiquetas;
* checklist de etapas;
* conclusão e reabertura de atividades.

### Visualização por prazo

As atividades são organizadas em grupos:

* atrasadas;
* hoje;
* amanhã;
* esta semana;
* futuras;
* concluídas.

Os grupos podem ser recolhidos e expandidos, mantendo a preferência do usuário.

### Foco e indicadores

* painel **Foco de hoje**;
* contagem de atividades atrasadas;
* atividades previstas para hoje;
* itens de alta prioridade;
* indicadores gerais de atividades;
* destaque do próximo passo.

### Busca e filtros

* busca por título;
* busca por descrição;
* busca por categoria;
* busca por etiquetas e etapas;
* filtro por status;
* filtro por tipo;
* ordenação por prazo, prioridade ou criação.

### Fluxo rápido

* edição diretamente nos cards;
* alteração de status e prioridade;
* ações rápidas de prazo;
* adiamento por um dia ou uma semana;
* rolagem automática até a atividade alterada;
* adição e remoção de etapas sem reabrir o formulário completo;
* mensagens de confirmação e toasts.

### Dados e aparência

* tema claro e escuro;
* exportação de backup em JSON;
* importação com validação;
* confirmação protegida para exclusão total;
* persistência por `localStorage`;
* interface responsiva.

## Engenharia do projeto

O projeto utiliza HTML, CSS e JavaScript puro com separação de responsabilidades.

A feature principal de atividades está dividida em módulos responsáveis por:

* controle e orquestração;
* modelo e normalização dos dados;
* persistência;
* renderização;
* formulários;
* edição inline;
* filtros;
* backup;
* diálogos;
* notificações;
* tema;
* painel de foco;
* estados vazios.

Essa estrutura permite evoluir partes específicas da aplicação sem concentrar todas as regras em um único arquivo.

## Tecnologias

* HTML5;
* CSS3;
* JavaScript;
* ES Modules;
* `localStorage`;
* Git;
* GitHub Pages.

## Testes

A versão `v0.2` possui testes manuais documentados para:

* criação e edição;
* validação de campos;
* filtros e ordenação;
* checklist;
* grupos de prazo;
* ações rápidas;
* temas;
* backup;
* armazenamento;
* responsividade;
* regressão após modularização.

Foram registrados:

* 45 testes funcionais principais aprovados;
* 7 testes de regressão aprovados;
* correção e reteste dos problemas encontrados durante o ciclo.

A documentação completa está em [`docs/06-testes.md`](docs/06-testes.md).

## Como executar localmente

Como a aplicação utiliza módulos JavaScript, recomenda-se executá-la com um servidor local.

### Live Server

1. Abra o projeto no Visual Studio Code.
2. Clique com o botão direito em `index.html`.
3. Selecione **Open with Live Server**.

### Python

```bash
python -m http.server 5500
```

Depois, abra:

```text
http://localhost:5500
```

## Estrutura principal

```text
note-and-finish/
├── docs/
├── public/
├── src/
│   ├── assets/
│   ├── scripts/
│   │   ├── features/
│   │   ├── app.js
│   │   └── main.js
│   ├── styles/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── themes/
│   │   └── utilities/
│   └── templates/
├── index.html
└── README.md
```

## Dados e privacidade

Os dados são armazenados somente no navegador do usuário.

A versão atual não utiliza:

* conta;
* autenticação;
* servidor;
* banco de dados externo;
* rastreamento;
* sincronização entre dispositivos.

A limpeza dos dados do navegador pode remover as atividades armazenadas. Por isso, a aplicação oferece exportação e importação manual de backup.

## Limitações atuais

* os dados permanecem apenas no navegador atual;
* não há sincronização em nuvem;
* não há notificações reais;
* não há calendário completo;
* tarefas recorrentes ainda não são suportadas;
* o histórico de alterações está planejado para uma versão futura;
* a aplicação ainda não funciona como PWA instalável.

## Próximos passos

O roadmap atual prevê:

* histórico simples de alterações;
* datas de conclusão;
* dashboard de acompanhamento;
* melhorias em etiquetas e categorias;
* refinamentos para dispositivos móveis;
* avaliação de instalação como PWA;
* modo de foco dedicado.

Consulte [`docs/05-roadmap.md`](docs/05-roadmap.md) para acompanhar o planejamento.

## Documentação

* [`docs/01-visao-do-projeto.md`](docs/01-visao-do-projeto.md): visão, problema e objetivo;
* [`docs/02-requisitos-e-escopo.md`](docs/02-requisitos-e-escopo.md): requisitos e limites;
* [`docs/03-fluxos-e-telas.md`](docs/03-fluxos-e-telas.md): fluxos da interface;
* [`docs/04-dados-e-arquitetura.md`](docs/04-dados-e-arquitetura.md): dados e organização técnica;
* [`docs/05-roadmap.md`](docs/05-roadmap.md): versões futuras;
* [`docs/06-testes.md`](docs/06-testes.md): testes e regressões;
* [`docs/07-changelog.md`](docs/07-changelog.md): histórico de evolução.

## Autor

Desenvolvido por **Vinícius Sidney** como projeto prático de Desenvolvimento Web, Engenharia de Software e Organização Técnica.

> **Da atividade dispersa ao próximo passo claro.**