# Project 03: CSS Houdini & @property

Este projeto explora o poder do **CSS Houdini**, especificamente a API de **Properties and Values**, que permite registrar variáveis CSS com tipos definidos, habilitando animações que seriam impossíveis com variáveis comuns.

## Funcionalidades
- Gradiente cônico animado com interpolação suave de cores e ângulos.
- Uso de `@property` para registrar as variáveis `--angle`, `--c1` e `--c2`.
- Efeito de brilho externo (outer glow) dinâmico.
- Glassmorphism e tipografia premium.

## Como funciona
1. Variáveis CSS comuns são tratadas como strings, logo o browser não sabe como animá-las (ex: de `red` para `blue` em um gradiente).
2. Ao registrar `@property --c1 { syntax: '<color>'; ... }`, o browser entende o valor como uma cor e consegue calcular os frames intermediários.
3. Isso permite animar propriedades complexas como `conic-gradient` e `radial-gradient` de forma nativa e performática.

## Compatibilidade
Disponível no Chrome (85+), Edge (85+) e Safari (16.4+).
