# 🖥️ 02 – Complex Admin Dashboard

Dashboard administrativo rico com sidebar colapsável, KPI cards, tabela de transações e layout full-height, construído com **Tailwind CSS**.

## 🚀 Como executar

Abra `index.html` diretamente no navegador (usa Tailwind via CDN).

Ou para compilar o CSS localmente:

```bash
npm install
npm run build   # compila o CSS
npm run watch   # modo watch
```

## 🎨 Recursos

- **Sidebar colapsável**: Menu lateral com navegação e botão de recolher via JavaScript
- **Header fixo**: Barra superior com título e avatar do usuário
- **KPI Cards**: 4 cards de métricas (Receita, Usuários, Pedidos, Suporte) com accent colorido via `border-l-4`
- **Tabela de transações**: Tabela responsiva com status badges coloridos (Pago, Pendente, Cancelado)
- **Layout full-height**: `h-screen overflow-hidden` com scroll apenas no conteúdo principal

## 📚 Conceitos Tailwind

- **Layout flex full-height**: `flex h-screen overflow-hidden` para sidebar + main
- **Sidebar responsiva**: `w-64` / `w-16` toggled via JS com `transition-all duration-300`
- **Border accent**: `border-l-4 border-indigo-500` para destaque visual nos cards
- **Status badges**: `px-2 py-0.5 rounded-full` com cores semânticas (green/amber/red)
- **Tabela estilizada**: `divide-y`, `hover:bg-gray-50`, `uppercase text-xs` no thead
- **Overflow control**: `overflow-auto` no main para scroll independente do sidebar
