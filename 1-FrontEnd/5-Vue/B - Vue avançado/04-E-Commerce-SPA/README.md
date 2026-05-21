# 🛍️ 04-E-Commerce-SPA — AuraStore Premium

Esta é uma aplicação completa de comércio eletrônico Single Page Application (SPA) desenvolvida com **Vue 3** (Composition API), **Vue Router** e **Pinia**. Ela simula uma experiência de compra corporativa luxuosa com catálogo de tecnologia, carrinho inteligente e checkout reativo de cartão virtual.

## 🎨 Características do Design e UX
- **Design Minimalista Escuro com Tons Ouro/Amber**: Estética elegante de alto padrão para venda de produtos de tecnologia sofisticados.
- **Transição de Rotas Premium**: Efeitos de fade cruzados (`out-in`) com Vue Router em todas as trocas de páginas.
- **Cartão de Crédito Virtual Rotativo**:
  - Representação tridimensional de um cartão de crédito na área de checkout.
  - Ao focar no campo de entrada **CVV**, o cartão rotaciona 180 graus de forma reativa exibindo a face traseira com a tarja magnética e o número do CVV.
- **Sistema de Cupons Dinâmicos**: Permite aplicar cupons como `TRILHA10` (10% off) ou `AURA50` (50% off!) com cálculo automático de impostos e frete dinâmico grátis para compras acima de $1000.
- **Persistência de Dados**: O estado do carrinho de compras é preservado nativamente no LocalStorage do navegador.

## 🛠️ Tecnologias Utilizadas
- **Vue 3** (Composition API com SFC)
- **Vite** (Build e bundling ultra-rápido)
- **Vue Router 4** (Roteamento dinâmico SPA)
- **Pinia** (Mecanismo centralizado de estado)
- **Vanilla CSS** (CSS com animações de ticks e rotações 3D)
- **LocalStorage** (Persistência completa do carrinho)

## 📁 Estrutura de Diretórios
```
04-E-Commerce-SPA/
├── src/
│   ├── models/
│   │   └── mockData.js     # Catálogo rico de produtos premium e reviews
│   ├── stores/
│   │   └── storeCart.js    # Store Pinia (carrinho, cupons, frete)
│   ├── router/
│   │   └── index.js        # Roteamento SPA e títulos dinâmicos
│   ├── views/
│   │   ├── CatalogView.vue       # Listagem de catálogo, pesquisa e filtros
│   │   ├── ProductDetailView.vue # Detalhes, specs técnicas e avaliações
│   │   ├── CartView.vue          # Carrinho, controle de quantidade e cupons
│   │   └── CheckoutView.vue      # Faturamento, cartão 3D rotativo e tick de sucesso
│   ├── App.vue
│   ├── main.js
│   └── style.css           # Tokens globais e variáveis de cores Amber
```

## ⚙️ Inicialização Local
Para executar este projeto em sua máquina local:
1. Certifique-se de que as dependências do Node estão instaladas.
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Realize o build para produção:
   ```bash
   npm run build
   ```
