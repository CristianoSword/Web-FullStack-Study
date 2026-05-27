# 🎨 Projeto 03: Theme Switcher via CSS Custom Properties

Este projeto demonstra como unir o poder de processamento do **Sass** com as vantagens em tempo real das **Custom Properties do CSS** para criar uma troca de temas eficiente.

## 🚀 Conceitos Demonstrados

* **Geração Automatizada de Variáveis:** O Sass varre mapas de cores (`$themes`) com a diretiva `@each` e gera as Custom Properties CSS na tag `:root` e nos seletores de atributos (`[data-theme="light"]`).
* **Troca Dinâmica no JS:** A interatividade modifica apenas o atributo `data-theme` da página, permitindo a transição fluida do tema sem recarregar ou regravar arquivos adicionais.

## 📦 Como Executar

```bash
npm install
npm run build:sass
```
Abra o `index.html` no navegador.
