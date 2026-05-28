# 📦 Projeto 04: BEM Architecture Pattern

Este projeto demonstra a aplicação prática da metodologia BEM (Block-Element-Modifier) estruturada com Sass modular em uma página institucional moderna e responsiva.

## 🚀 Conceitos e Arquitetura

* **Metodologia BEM:** Separação rígida de componentes em:
  * **Block:** O componente pai independente (ex: `site-hero`, `feature-list`, `metric-card`).
  * **Element:** Partes internas vinculadas ao pai (`block__element`, ex: `site-hero__title`, `metric-card__value`).
  * **Modifier:** Modificações de estado ou estilo (`block--modifier`, ex: `metric-card--featured`, `feature-list__item--active`, `button--primary`).
* **Sass Aninhado:** Uso do seletor pai `&` do Sass (ex: `&__title`, `&--featured`) para gerar automaticamente as classes nomeadas BEM e manter a legibilidade.

## 📦 Como Executar

```bash
npm install
npm run build:sass
```
Abra o `index.html` no seu navegador para ver o layout estruturado com as classes BEM.
