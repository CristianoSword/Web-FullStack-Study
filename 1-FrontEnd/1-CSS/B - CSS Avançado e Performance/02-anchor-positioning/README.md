# Project 02: CSS Anchor Positioning

Este projeto demonstra o uso da funcionalidade experimental (mas revolucionária) de **Anchor Positioning** no CSS, que permite vincular um elemento "flutuante" a um elemento "âncora" de forma puramente declarativa.

## Funcionalidades
- Tooltips inteligentes que acompanham os botões.
- Uso de `anchor-name` para definir os botões como referências.
- Uso de `position-anchor` e a função `anchor()` para definir as coordenadas.
- Design responsivo e acessível com `aria-describedby`.

## Como funciona
1. O elemento alvo (âncora) recebe um nome global via `anchor-name: --nome-da-ancora`.
2. O elemento flutuante (tooltip) utiliza `position-anchor: --nome-da-ancora`.
3. As propriedades de posicionamento (`top`, `left`, etc.) usam a função `anchor()` para se basear nas bordas do elemento âncora (ex: `top: anchor(bottom)`).

## Compatibilidade
Disponível em versões recentes do Chrome (125+) e Edge. Requer flag ou suporte nativo para visualização completa.
