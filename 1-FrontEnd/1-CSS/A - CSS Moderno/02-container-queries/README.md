# Estudo de CSS Moderno: Container Queries

As Container Queries permitem que estilizemos elementos com base no tamanho do seu **container pai**, e não mais apenas no tamanho da tela (viewport).

## O que este exemplo demonstra:

1.  **Componentes Reutilizáveis**: Temos exatamente o mesmo HTML (`.post-card`) em dois lugares diferentes.
2.  **Adaptação por Contexto**: 
    - Na **Sidebar** (espaço estreito), o card se comporta como uma lista vertical com imagem pequena.
    - Na **Área Principal** (espaço largo), o mesmo card se transforma automaticamente em um layout horizontal com mais detalhes.
3.  **Independência de Media Queries**: Se redimensionarmos a janela, os cards mudarão de layout assim que os seus containers atingirem os breakpoints definidos (`500px` e `800px`).

## Por que usar?
Isso resolve o problema de "onde o componente será usado". Você cria o componente uma vez e ele se adapta perfeitamente seja numa coluna lateral, num grid de 3 colunas ou numa seção de destaque em tela cheia.

## Como funciona (Resumo):
1.  Defina o container pai com `container-type: inline-size`.
2.  Use `@container` (ao invés de `@media`) para aplicar os estilos.

> [!IMPORTANT]
> No CSS, a **ordem das regras importa**. Sempre defina os estilos base do componente **antes** das Container Queries, para que as queries consigam sobrescrever os valores base corretamente quando a condição for atingida.
