# 🎨 Projeto 02-Mixins-Functions: UI Component Kit

Kit de componentes de UI — **Botões, Alertas e Badges** — gerados automaticamente por **Mixins Paramétricos HSL** e **Funções Sass** customizadas.

## 🚀 Conceitos Demonstrados

- **`@mixin button-variant($h, $s, $l, $name)`** — Um único mixin gera automaticamente as 6 variações de cor (primary, secondary, success, danger, warning, info) com estados `hover`, `active`, `focus` e `disabled`, além das variantes `outline` e `ghost`.
- **`@mixin alert-variant($h, $s, $l, $name)`** — Gera alertas com borda lateral colorida, ícone e fundo suave derivados dos mesmos parâmetros HSL.
- **`@mixin badge-variant()`** — Badges de tags compactas com transparência automática.
- **`@function rem($px)`** — Converte px para rem garantindo acessibilidade.
- **`@use 'sass:math'`** — Matemática nativa moderna do Sass.

## 📦 Como Executar

```bash
npm install
npm run build:sass   # compilação única
npm run watch:sass   # watch mode
```
Abrir `index.html` no navegador.
