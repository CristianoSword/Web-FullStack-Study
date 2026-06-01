# 👤 01 – Profile Card

Card de perfil de usuário estilizado exclusivamente com classes utilitárias do **Tailwind CSS**.

## 🚀 Como executar

```bash
npm install
npm run build   # compila o CSS
npm run watch   # modo watch
```

Abra `index.html` no navegador.

## 🎨 Recursos

- **Avatar com iniciais**: Círculo com gradiente e iniciais do usuário, com ring de borda branca
- **Banner de capa**: Gradiente colorido no topo do card
- **Estatísticas**: Grid de 3 colunas com posts, seguidores e seguindo
- **Botões de ação**: Seguir (primário) e Mensagem (outline)
- **Hover states**: Transições suaves nos botões com `active:scale-95`

## 📚 Conceitos Tailwind

- `utility-first`: Toda estilização via classes utilitárias, sem CSS customizado
- `flexbox` e `grid`: Layout com `flex`, `grid-cols-3` e `divide-x`
- `gradients`: `bg-gradient-to-r/br` com `from/via/to`
- `ring`: Borda de foco/destaque com `ring-4 ring-white`
- `hover` e `active` states: `hover:bg-indigo-700`, `active:scale-95`
- `transition`: Animações suaves com `transition-all duration-150`
- `shadow`: Sombras com `shadow-xl`, `shadow-md shadow-indigo-200`
- `rounded`: Bordas arredondadas com `rounded-3xl`, `rounded-xl`, `rounded-full`
