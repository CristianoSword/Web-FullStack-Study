# 🌀 05-Vue-Infinite-Scroll-Portal — AuraFeed

Esta é uma aplicação avançada de portal de feeds técnicos desenvolvida com **Vue 3** (Composition API) e **Pinia**. Ela implementa um mecanismo de carregamento de páginas infinito sob demanda (`Infinite Scroll`) acionado por `IntersectionObserver` e visualizações detalhadas transportadas dinamicamente via `<Teleport>` de forma a isolar z-index do DOM.

## 🎨 Características do Design e UX
- **Design Minimalista Dark Verde Menta (Mint/Emerald)**: Visual luxuoso de alta fidelidade para consumo confortável de artigos de leitura técnica.
- **Infinite Scroll via IntersectionObserver**: Monitoramento de viewport em tempo real com indicador de carregamento de pulso neon reativo que simula latência de dados.
- **Vue Teleport de Modais de Leitura**:
  - Transporta dinamicamente a janela modal de leitura de artigos para fora do contêiner root (`#teleport-modal-destination`).
  - Garante o isolamento completo de hierarquia `z-index` e de escopos sem alterar a reatividade dos dados.
- **Transição com Transition-Group**: Efeitos visuais dinâmicos de subida e fade ao acrescentar novos artigos paginados ao feed.
- **Filtros Ágeis**: Navegação por guias de categorias técnica (`Tecnologia`, `Design`, `Negócios`, `Futuro`).

## 🛠️ Tecnologias Utilizadas
- **Vue 3** (Composition API com SFC e Teleport)
- **Vite** (Build e bundling ultra-rápido)
- **Pinia** (Gerenciamento de estados de feed)
- **Intersection Observer API** (Rolagem sob demanda nativa de alta performance)
- **Vanilla CSS** (Animações de loaders pulsantes e backdrops desbotados)

## 📁 Estrutura de Diretórios
```
05-Vue-Infinite-Scroll-Portal/
├── src/
│   ├── models/
│   │   └── mockData.js     # Artigos semente paginados de 1 a 3
│   ├── stores/
│   │   └── storeFeed.js    # Store central do feed (modais, paginação, filtros)
│   ├── App.vue             # Feed responsivo, observadores e Teleport modais
│   ├── main.js
│   └── style.css           # Variáveis globais do tema dark Mint
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
