# 🎨 Projeto 01-Variables-Nesting: Futuristic Profile Card

Este projeto faz parte do módulo de estudos de **Less/Sass** (Pré-processadores CSS) e demonstra de forma prática a utilização avançada de **Variáveis (Tokens de Design)** e **Aninhamento (Nesting Rules)** para criar uma interface de cartão de perfil futurista interativo e altamente premium com suporte a Live Theme Switcher.

---

## 🚀 Conceitos de Sass Demonstrados

### 1. Sistema de Variáveis & Tokens (`src/scss/_variables.scss`)
Toda a identidade visual do projeto é controlada por meio de variáveis semânticas do Sass. Isso facilita a manutenção e garante harmonia visual:
* **Cores HSL Customizadas:** Definição de cores de destaque (Neon Accents) e cores de fundo do tema escuro usando a função `hsl()` para manipulação direta de matiz, saturação e luminosidade.
* **Gradients Dinâmicos:** Variáveis que armazenam interpolações lineares de gradientes reutilizáveis.
* **Escala Espaçadora Reativa:** Margens e paddings padronizados em unidades relativas (`rem`) para garantir acessibilidade e responsividade.
* **Tokens de Efeito:** Sombras customizadas com opacidade HSL, efeitos de brilho em neon (*glow*) e filtros de blur para *glassmorphism*.

### 2. Aninhamento Avançado (`src/scss/main.scss`)
O arquivo de estilo principal demonstra as principais formas de aninhamento nativo do Sass para produzir CSS limpo e estruturado:
* **Aninhamento de Elementos:** Estruturação semântica seguindo a metodologia BEM (ex: `.profile-card { &__header { .avatar-wrapper { ... } } }`).
* **Pseudo-classes e Pseudo-elementos (`&`):** Manipulação simplificada de interações (como `&:hover`, `&:active`, `&::before` e `&::after`).
* **Modificadores Aninhados:** Variações do mesmo componente escritas diretamente no escopo principal (ex: `&--vip` para tags especiais ou `&--primary` para botões).
* **Media Queries Aninhadas:** Breakpoints de responsividade declarados diretamente dentro do seletor que está sendo modificado, facilitando a legibilidade (ex: `@media (max-width: 480px) { ... }` dentro da classe `.profile-card`).
* **Referência de Contexto Pai (`.theme-light &`):** Utilização da referência de pai do Sass no início do seletor para adaptar as variáveis de cores dinamicamente quando a classe `.theme-light` é inserida na tag `<body>` pelo alternador de tema.

---

## 🛠️ Tecnologias Utilizadas

* **Estrutura:** HTML5 Semântico
* **Estilo:** Sass (SCSS) compilado nativamente
* **Interatividade:** Vanilla JavaScript (Live Tab Switcher e Live Theme Switcher)
* **Ícones:** FontAwesome v6.4.0
* **Fontes:** Google Fonts (Inter)

---

## 📦 Como Executar e Compilar

### 1. Instalar as Dependências
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. No diretório deste projeto, execute:
```bash
npm install
```

### 2. Compilar o Sass para CSS
Para rodar a compilação única do arquivo `.scss` para `.css`:
```bash
npm run build:sass
```

### 3. Assistir às Alterações em Tempo Real (Watch Mode)
Para compilar automaticamente sempre que salvar um arquivo Sass:
```bash
npm run watch:sass
```

### 4. Executar no Navegador
Basta abrir o arquivo `index.html` diretamente no seu navegador!
