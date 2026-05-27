# 📐 Projeto 04: Sistema de Grid Responsivo Customizado

Este projeto demonstra a construção de um grid responsivo completo de 12 colunas e contêineres adaptativos utilizando loops e mapas do Sass.

## 🚀 Conceitos Demonstrados

* **Loops de Grade (`@for`):** Gera automaticamente classes `.col-[breakpoint]-[1-12]` dividindo as proporções matemáticas no Sass (`width: math.div($i, 12) * 100%`).
* **Mapeamento de Breakpoints (`@each`):** Mapeia breakpoints responsivos e contêineres móveis gerando as media queries dinamicamente via mixin `@mixin respond-to()`.

## 📦 Como Executar

```bash
npm install
npm run build:sass
```
Abra o `index.html` no navegador.
