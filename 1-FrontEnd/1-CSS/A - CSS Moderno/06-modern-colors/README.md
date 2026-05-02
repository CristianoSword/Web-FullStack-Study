# Estudo de CSS Moderno: Cores Dinâmicas

A manipulação de cores no CSS evoluiu para permitir que criemos paletas inteiras a partir de uma única variável, sem precisar de ferramentas externas ou cálculos manuais.

## O que este exemplo demonstra:

1.  **`color-mix()`**: Permite misturar duas cores em um espaço de cores específico (ex: `srgb`). No exemplo, criamos tons mais claros (misturando com branco) e mais escuros (misturando com preto) da cor base.
2.  **Sintaxe de Cor Relativa (`from color`)**: Permite "desconstruir" uma cor existente e remontá-la modificando apenas alguns canais. Usamos isso para criar variações de opacidade (canal alfa) mantendo o RGB original da variável.

## Por que usar?
- **Temas Dinâmicos**: Você pode mudar apenas uma variável `--brand-color` e todo o sistema de cores (tons claros, escuros, transparências) se atualizará automaticamente.
- **Código Limpo**: Elimina a necessidade de dezenas de variáveis de cores pré-calculadas.
- **Sem Pré-processadores**: O que antes exigia funções do Sass (`lighten`, `darken`, `rgba`), agora é nativo e dinâmico no navegador.

## Como usar (Resumo):
- Mistura: `color-mix(in srgb, var(--cor), white 20%)`
- Relativa: `rgb(from var(--cor) r g b / 0.5)`
