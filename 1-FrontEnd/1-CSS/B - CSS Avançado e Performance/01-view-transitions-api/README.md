# Project 01: View Transitions API

Este projeto demonstra como utilizar a **View Transitions API** nativa para criar transições suaves entre estados de uma aplicação, simulando uma experiência de aplicativo mobile ou Single Page Application (SPA).

## Funcionalidades
- Transição suave entre a Home e os Detalhes do filme.
- Uso de `view-transition-name` para "morfismo" de elementos entre estados.
- Customização de animações via CSS (fading e scaling do root).
- Acessibilidade básica com `aria-live` e `aria-label`.

## Como funciona
1. O JavaScript utiliza `document.startViewTransition(() => { ... })` para envolver a mudança de DOM.
2. O navegador captura o estado "antigo" e o "novo".
3. O CSS define nomes para elementos que devem ser mantidos/animados entre estados (ex: `.movie-thumb` e `.movie-banner`).
4. O navegador gera automaticamente a animação de interpolação.

## Compatibilidade
Disponível em navegadores modernos (Chrome 111+, Edge 111+, Safari 18+).
