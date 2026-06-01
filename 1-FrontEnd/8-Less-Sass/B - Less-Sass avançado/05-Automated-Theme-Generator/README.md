# 🎨 05 – Automated Theme Generator

Gerador automático de paletas de cores a partir de uma cor primária, usando **Sass** com mapas, `@each` e mixins para criar múltiplos temas completos de forma programática.

## 🚀 Como executar

```bash
npm install
npm run build:sass   # compila o SCSS
npm run watch:sass   # modo watch
```

Abra `index.html` no navegador.

## 🎨 Recursos

- **3 temas gerados automaticamente**: Ocean (azul frio), Forest (verde operacional), Sunset (laranja editorial)
- **Geração via mapa Sass**: Um único mapa de cores gera todas as classes de tema
- **Variáveis CSS customizadas**: Cada tema expõe suas cores como `--color-primary`, `--color-surface`, etc.
- **Cards de tema**: Cada tema tem label, título, descrição e botão estilizados com as cores geradas

## 📚 Conceitos Sass Avançados

- **`@each` com mapas**: Iteração sobre `$themes: (ocean: #0ea5e9, forest: #22c55e, sunset: #f97316)` para gerar classes
- **Mixins de tema**: `@mixin generate-theme($name, $base-color)` encapsula toda a lógica de geração
- **Funções de cor**: `darken()`, `lighten()`, `mix()` para derivar tons da cor base
- **Variáveis CSS**: Saída como custom properties para uso dinâmico no JS
- **BEM + temas**: Classes como `.theme-ocean`, `.theme-card`, `.theme-card__label`
