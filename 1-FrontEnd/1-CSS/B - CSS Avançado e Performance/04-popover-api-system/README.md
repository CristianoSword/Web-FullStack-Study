# Project 04: Popover API System

Este projeto demonstra o uso da **Popover API** nativa, que fornece uma maneira padronizada de criar overlays (modais, menus, tooltips) sem a necessidade de bibliotecas JavaScript pesadas para gerenciamento de estados.

## Funcionalidades
- Menu principal e submenus nativos usando o atributo `popover`.
- Uso de `popovertarget` para vincular botões aos seus respectivos popovers.
- Estilização da pseudo-classe `:popover-open` para animações de entrada.
- Uso do pseudo-elemento `::backdrop` para escurecer o fundo.
- Comportamento de "light dismiss" (clicar fora fecha o popover) automático.

## Como funciona
1. Adicione o atributo `popover` (ou `popover="auto"`) a qualquer elemento que deseja transformar em um overlay.
2. Vincule um botão ao elemento usando `popovertarget="id-do-elemento"`.
3. O navegador cuida do posicionamento no "top layer" (acima de qualquer `z-index`) e da acessibilidade (foco, fechar com Esc, etc).

## Compatibilidade
Disponível no Chrome (114+), Edge (114+), Safari (17+) e Firefox (125+).
