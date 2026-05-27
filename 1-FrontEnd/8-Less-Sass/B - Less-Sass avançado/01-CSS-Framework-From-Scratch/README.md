# 📦 Projeto 01: CSS Framework From Scratch

Este projeto demonstra a criação e estruturação de um mini-framework CSS modular do zero utilizando Sass moderno.

## 🚀 Conceitos e Arquitetura

* **Arquitetura de Pastas:** Separação limpa em subdiretórios de `abstracts` (tokens de design, mixins de layouts e reusabilidade) e `components` (cards, botões, etc).
* **Geradores Dinâmicos de Utilidades:** Geração em lote automatizada de classes utilitárias de margin e padding (`m-`, `p-`, `mt-`, `pb-`) via loops Sass iterando sobre mapas de tokens de escala de espaçamento.

## 📦 Como Executar

```bash
npm install
npm run build:sass
```
Abra o `index.html` no navegador.
