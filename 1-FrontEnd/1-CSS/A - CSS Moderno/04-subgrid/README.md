# Estudo de CSS Moderno: Subgrid

O `subgrid` permite que um item de um grid (que também é um grid) utilize as linhas e colunas do grid pai para posicionar seus próprios filhos.

## O que este exemplo demonstra:

1.  **Alinhamento Perfeito**: Mesmo que os títulos tenham tamanhos diferentes ou as descrições variem, os botões "Ver mais" e as imagens ficam perfeitamente alinhados horizontalmente entre todos os cards da linha.
2.  **Herança de Grid**: O container `.card` não define seu próprio tamanho de linha, ele diz `grid-template-rows: subgrid`, herdando o dimensionamento do `.card-grid`.

## Por que usar?
Antes do subgrid, era quase impossível alinhar elementos internos de cards vizinhos se o conteúdo fosse dinâmico, a menos que usássemos alturas fixas (o que é ruim para responsividade e acessibilidade) ou truques complexos de Flexbox que nem sempre funcionavam para todos os elementos internos.

## Como funciona (Resumo):
1.  O pai (`.card-grid`) define o grid principal.
2.  O filho (`.card`) define `display: grid` e `grid-template-rows: subgrid` (ou columns).
3.  O filho deve ocupar o número correto de linhas/colunas do pai (`grid-row: span X`).
