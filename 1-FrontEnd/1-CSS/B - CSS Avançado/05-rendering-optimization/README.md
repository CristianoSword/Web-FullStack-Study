# Project 05: Rendering Optimization (Content Visibility)

Este projeto demonstra como otimizar o carregamento e o scroll de páginas com grandes volumes de dados utilizando a propriedade CSS `content-visibility`.

## Funcionalidades
- Lista com 1.000 itens gerados dinamicamente.
- Uso de `content-visibility: auto` para pular o rendering de elementos fora da tela.
- Uso de `contain-intrinsic-size` para evitar saltos de scroll (layout shift).
- Design premium com tipografia modernizada e efeitos de hover.

## Como funciona
1. O navegador normalmente renderiza todos os elementos do DOM, mesmo que não estejam visíveis.
2. Com `content-visibility: auto`, o navegador adia o trabalho de rendering e layout dos elementos até que eles se aproximem da viewport.
3. `contain-intrinsic-size` fornece uma altura estimada para o elemento enquanto ele não é renderizado, garantindo que a barra de rolagem se comporte corretamente.

## Compatibilidade
Disponível no Chrome (85+), Edge (85+) e Safari (18+). No Firefox, a propriedade está em desenvolvimento.
