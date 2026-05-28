# 🎨 Projeto 05: Automated Theme Generator

Este projeto demonstra a automação da criação de temas e paletas de cores utilizando um mapa de variáveis e loops no pré-processador Sass.

## 🚀 Conceitos e Arquitetura

* **Mapas Sass:** Configuração de um mapa (`$themes`) contendo nomes de temas e suas respectivas cores base.
* **Geração Automática de Variáveis CSS:** Utilização da diretiva `@each` para iterar sobre o mapa de temas, gerando automaticamente classes utilitárias (`.theme-ocean`, `.theme-forest`, etc.) contendo variáveis CSS nativas (Custom Properties).
* **Funções de Cor:** Criação de funções utilitárias em Sass (`surface()`, `ink()`) que calculam superfícies, fundos, bordas e glows a partir de uma única cor base através da função `color.mix()`.
* **Componentes Agnosticos:** Os cards e a interface se baseiam nas variáveis nativas do CSS (`var(--theme-base)`, `var(--theme-surface)`), permitindo alterar totalmente a aparência da UI ao trocar a classe no elemento pai.

## 📦 Como Executar

```bash
npm install
npm run build:sass
```
Abra o `index.html` no seu navegador para ver os diferentes temas aplicados aos cards de exemplo.
