# Estudo de CSS Moderno: Cascade Layers (`@layer`)

As Cascade Layers permitem que os desenvolvedores organizem o CSS em camadas explícitas, onde a ordem das camadas define a prioridade (quem "ganha") em caso de conflito, independentemente da especificidade do seletor.

## O que este exemplo demonstra:

1.  **Declaração de Ordem**: Usamos `@layer reset, base, components, utilities;` no topo do arquivo. Isso significa que qualquer estilo na camada `utilities` ganhará de `components`, que ganhará de `base`, e assim por diante.
2.  **Vencendo a Especificidade**: 
    - Na camada `base`, temos um seletor forte: `button.btn.primary`.
    - Na camada `utilities`, temos um seletor fraco: `.primary`.
    - Normalmente, o seletor forte venceria. Mas com `@layer`, o seletor na camada posterior (`utilities`) vence sempre.

## Por que usar?
- Acaba com a "guerra de especificidade" (muitos IDs ou classes encadeadas).
- Permite importar bibliotecas externas em camadas de baixa prioridade, garantindo que seu CSS local sempre tenha precedência sem precisar de `!important`.
- Facilita a manutenção de grandes projetos.

## Como usar:
Basta envolver seus estilos com `@layer nome-da-camada { ... }`.
