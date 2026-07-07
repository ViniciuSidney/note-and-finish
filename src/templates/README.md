# Templates HTML

Esta pasta guarda modelos estruturais reutilizáveis em HTML.

Os arquivos desta pasta não representam páginas finais da aplicação. Eles funcionam como moldes para copiar, adaptar e usar em telas reais de novos projetos.

---

# 1. Objetivo

O objetivo dos templates é facilitar a criação de novas telas mantendo:

- organização estrutural;
- padronização de classes CSS;
- reaproveitamento de componentes;
- consistência visual entre aplicações;
- redução de retrabalho.

Sempre que uma nova tela for criada, o ideal é escolher o template mais próximo da necessidade da tela e adaptá-lo ao conteúdo real do projeto.

---

# 2. Diferença entre template e página real

## Template

Um template é um modelo genérico.

Exemplos:

- `layouts/gallery.html`
- `layouts/form.html`
- `layouts/crud.html`

Ele possui títulos, textos, botões e áreas genéricas apenas para mostrar a estrutura correta.

## Página real

Uma página real usa o template como base, mas recebe conteúdo verdadeiro da aplicação.

Exemplos:

- tela de matérias;
- tela de tarefas;
- tela de configurações;
- tela de questões;
- tela de relatórios.

---

# 3. Como usar um template

Fluxo recomendado:

1. Identificar o objetivo da tela.
2. Escolher o layout adequado.
3. Abrir o arquivo correspondente em `templates/layouts`.
4. Copiar a estrutura HTML.
5. Colar na página real da aplicação.
6. Alterar textos, botões e conteúdos.
7. Adicionar IDs necessários para JavaScript.
8. Conectar a tela com a feature correspondente.

Exemplo:

Para criar uma tela de matérias em formato de cards:

1. Escolher `layouts/gallery.html`.
2. Copiar a estrutura.
3. Trocar o título para “Matérias”.
4. Trocar a descrição.
5. Ajustar filtros.
6. Adicionar `id="subjectsGrid"` na grade.
7. Criar a lógica em `scripts/features/subjects`.

---

# 4. Regra principal

Classes CSS devem ser usadas para aparência e estrutura.

IDs devem ser usados para comportamento específico com JavaScript.

Exemplo:

```html
<div class="gallery-grid" id="subjectsGrid"></div>
```

Neste exemplo:

- `gallery-grid` define o estilo e a organização visual.
- `subjectsGrid` permite que o JavaScript encontre essa área específica.

---

# 5. Pasta `layouts`

A pasta `layouts` guarda moldes de telas completas.

## Arquivos principais

| Arquivo | Layout correspondente | Uso principal |
|---|---|---|
| `hub.html` | L01 - Hub Inicial | Tela inicial e menu principal |
| `shell.html` | L02 - Shell Modular | Tela principal com painéis laterais |
| `dashboard.html` | L03 - Dashboard Analítico | Indicadores, gráficos e dados |
| `form.html` | L04 - Formulário Guiado | Cadastro e edição |
| `wizard.html` | L05 - Wizard | Processo em etapas |
| `master-detail.html` | L06 - Mestre-Detalhe | Lista com detalhes |
| `crud.html` | L07 - Gerenciador de Registros | Gestão de dados |
| `gallery.html` | L09 - Galeria de Cards | Itens visuais em cards |
| `focus.html` | L13 - Focus Mode | Tela de foco |
| `settings.html` | L19 - Settings | Configurações |
| `report.html` | L20 - Report | Relatórios e resultados |
| `search.html` | L23 - Search | Busca e resultados |
| `empty-state.html` | L25 - Empty State | Tela sem dados |

---

# 6. Pasta `components`

A pasta `components` guarda moldes de componentes menores.

Esses componentes podem aparecer dentro de vários layouts.

## Arquivos principais

| Arquivo | Componente | Uso principal |
|---|---|---|
| `button.html` | Botões | Ações principais e secundárias |
| `card.html` | Cards | Itens visuais |
| `panel.html` | Painéis | Agrupamento de conteúdo |
| `modal.html` | Modais | Confirmações, formulários e alertas |
| `form-field.html` | Campo de formulário | Inputs com label e validação |
| `alert.html` | Alertas | Avisos, erros e sucessos |
| `badge.html` | Badges | Status, categorias e etiquetas |
| `table.html` | Tabelas | Dados em linhas e colunas |

---

# 7. Relação com CSS

Os templates HTML usam classes definidas em:

- `src/styles/components`;
- `src/styles/layouts`;
- `src/styles/base-layout`;
- `src/styles/utilities`.

Os templates não devem depender de estilos específicos de uma aplicação.

A identidade visual própria da aplicação deve ficar em:

```text
src/styles/themes/app-theme.css
```

Assim, os mesmos templates podem ser usados em vários projetos com cores, fontes, sombras e personalidade visual diferentes.

---

# 8. Onde ficam os estilos reutilizáveis

Os estilos reutilizáveis devem permanecer na pasta `src/styles`.

A pasta `templates` deve guardar apenas exemplos estruturais em HTML.

Motivo:

- CSS reutilizável é parte da base real do projeto.
- Templates HTML são exemplos copiáveis.
- Separar os dois evita duplicação.
- A aplicação final importa os estilos pelo `main.css`.
- O template apenas mostra quais classes usar.

Resumo:

```text
src/styles     -> estilos reais reutilizáveis
src/templates  -> moldes HTML para copiar e adaptar
```

---

# 9. Quando criar um novo template

Criar um novo template quando:

- a estrutura for usada em mais de uma tela;
- o layout resolver um tipo de tela diferente;
- copiar e adaptar um layout existente exigir mudanças demais;
- o padrão puder ser reutilizado em projetos futuros.

Não criar um novo template quando:

- mudar apenas a cor;
- mudar apenas o texto;
- mudar apenas o tamanho;
- for uma pequena variação de outro template.

Nesse caso, adaptar o template existente.

---

# 10. Regras para adaptar templates

Ao adaptar um template para uma página real:

- manter as classes estruturais principais;
- trocar textos genéricos por textos reais;
- remover blocos que não serão usados;
- adicionar IDs somente quando houver necessidade de JavaScript;
- evitar criar classes novas sem necessidade;
- reaproveitar componentes existentes sempre que possível;
- manter a hierarquia visual do layout.

---

# 11. Exemplo de adaptação

## Template genérico

```html
<section class="layout-gallery">
  <header class="gallery-header">
    <div class="gallery-title-group">
      <h1 class="gallery-title">Título da Galeria</h1>
      <p class="gallery-description">Descrição da galeria.</p>
    </div>
  </header>

  <div class="gallery-grid">
    <!-- Cards entram aqui -->
  </div>
</section>
```

## Página real

```html
<section class="layout-gallery">
  <header class="gallery-header">
    <div class="gallery-title-group">
      <h1 class="gallery-title">Matérias</h1>
      <p class="gallery-description">
        Organize suas matérias de estudo e acesse seus conteúdos.
      </p>
    </div>
  </header>

  <div class="gallery-grid" id="subjectsGrid">
    <!-- Cards de matérias serão renderizados aqui -->
  </div>
</section>
```

---

# 12. Recomendações de organização

## Templates de layout

Use para telas completas.

Exemplos:

- `gallery.html`
- `crud.html`
- `settings.html`

## Templates de componentes

Use para partes menores que aparecem dentro das telas.

Exemplos:

- `card.html`
- `button.html`
- `modal.html`

## Páginas reais

Devem ficar na estrutura normal da aplicação.

Exemplos possíveis:

- `index.html`, em aplicação simples;
- `pages/materias.html`, em aplicação com múltiplas páginas;
- `views/pages/materias.php`, em aplicação PHP/MVC.

---

# 13. Regra final

Os templates devem funcionar como ponto de partida.

Eles não devem limitar a criação da aplicação, mas devem evitar que cada tela seja criada do zero sem padrão.

A ideia é manter um equilíbrio:

- estrutura reaproveitável;
- adaptação livre;
- organização clara;
- desenvolvimento mais rápido.
