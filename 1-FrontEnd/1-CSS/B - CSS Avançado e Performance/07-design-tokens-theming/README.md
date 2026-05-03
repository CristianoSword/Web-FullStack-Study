# Project 07: Design Tokens & Theming

Este projeto demonstra a implementação de um sistema de temas robusto utilizando **Design Tokens** (variáveis CSS) e a nova função `color-mix()` para criar uma arquitetura de estilos escalável e fácil de manter.

## Funcionalidades
- Temas Light, Dark e Cyber totalmente integrados.
- Separação entre **Primitive Tokens** (paleta bruta) e **Semantic Tokens** (uso contextual).
- Uso de `color-mix()` para gerar estados de hover e bordas dinamicamente, reduzindo a necessidade de definir dezenas de variáveis extras.
- Transições suaves entre temas.
- Design System de exemplo com card e botões.

## Como funciona
1. Definimos os **Primitive Tokens** no `:root` (ex: `--color-blue-500`).
2. Definimos os **Semantic Tokens** em escopos de atributos (ex: `[data-theme="dark"] { --primary: var(--color-blue-500); }`).
3. Utilizamos os tokens semânticos nos componentes.
4. Para variações (como hover), usamos `color-mix(in srgb, var(--primary), black 20%)` em vez de criar uma nova variável `--primary-hover`.

## Compatibilidade
Disponível em todos os navegadores modernos (Chrome 111+, Firefox 113+, Safari 16.2+).
