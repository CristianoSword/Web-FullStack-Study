# 🌌 06 – Less Advanced Theme

Sistema avançado de temas em **Less** utilizando variáveis, guards condicionais, mixins paramétricos e loops para gerar tokens de tema e componentes de forma automática.

## 🚀 Como executar

```bash
npm install
npm run build:less   # compila o Less
npm run watch:less   # modo watch
```

Abra `index.html` no navegador.

## 🎨 Recursos

- **Tema Aurora**: Sistema de cores escuras com accent neon gerado via Less
- **Dashboard layout**: Header com título e botão de ação, stats grid e painel de paleta
- **Stats cards**: 3 cards de métricas (Receita, Conversão, Alertas) com variantes de cor
- **Paleta visual**: Swatches mostrando as cores geradas pelo sistema de tema
- **BEM estruturado**: Classes `.dashboard`, `.stat-card`, `.palette__swatch` etc.

## 📚 Conceitos Less Avançados

- **Variáveis Less**: `@primary`, `@surface`, `@text` como tokens de design
- **Guards condicionais**: `when (@theme = aurora)` para aplicar estilos condicionalmente
- **Mixins paramétricos**: `.generate-card(@variant, @color)` para criar variantes de componentes
- **Loops Less**: `.loop(@n)` para gerar classes repetitivas de forma programática
- **Namespaces**: Agrupamento de mixins relacionados em namespaces Less
- **Operações de cor**: `darken()`, `lighten()`, `fade()` para derivar tons
