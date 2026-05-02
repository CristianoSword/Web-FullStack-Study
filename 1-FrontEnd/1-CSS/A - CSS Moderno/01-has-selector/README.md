# Estudo de CSS Moderno: Seletor `:has()`

O seletor `:has()` é frequentemente chamado de "seletor pai" (parent selector). Ele permite que você estilize um elemento com base nos seus descendentes ou no estado dos seus descendentes.

## O que este exemplo demonstra:

1.  **Detecção de Conteúdo**: O layout do card muda automaticamente se ele contém uma `<img>` ou não.
2.  **Estados de Formulário**: O container de um input (`.form-group`) muda sua borda e fundo se o input interno estiver em `:focus`.
3.  **Validação Visual**: Se um elemento `.error-msg` existir dentro do container, o container inteiro muda para o estado de erro (cor vermelha).

## Por que isso é revolucionário?
Antigamente, para mudar o estilo de um elemento pai baseado em algo que aconteceu no filho, precisávamos de JavaScript para adicionar ou remover classes. Com `:has()`, fazemos isso de forma puramente declarativa no CSS.

## Suporte
O suporte atual é excelente (>90% dos navegadores modernos), incluindo Chrome, Firefox e Safari.
