# Project 06: CSS Logical Properties (i18n)

Este projeto demonstra como criar interfaces que suportam múltiplos idiomas e direções de escrita (LTR e RTL) sem a necessidade de duplicar regras de CSS ou usar hacks baseados em seletores de direção para cada margem ou padding.

## Funcionalidades
- Switcher dinâmico entre LTR (Left-to-Right) e RTL (Right-to-Left).
- Uso de propriedades lógicas: `margin-inline`, `padding-block`, `border-inline-start`.
- Alinhamento de texto dinâmico com `text-align: start`.
- Transição suave e design premium com Glassmorphism.

## Como funciona
1. Propriedades físicas (ex: `margin-left`) são fixas no espaço, independente da direção do texto.
2. Propriedades lógicas (ex: `margin-inline-start`) dependem do fluxo do documento. Se o texto corre da direita para a esquerda, o "start" será a direita.
3. Isso permite que uma única base de código CSS funcione perfeitamente para Português, Inglês, Árabe ou Hebraico.

## Compatibilidade
Disponível em todos os navegadores modernos (Chrome 87+, Firefox 66+, Safari 14.1+).
