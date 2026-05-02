# Estudo de CSS Moderno: Scroll-Driven Animations

Esta funcionalidade permite que você vincule animações CSS diretamente ao progresso do scroll de um container ou à visibilidade de um elemento na tela (viewport).

## O que este exemplo demonstra:

1.  **Barra de Progresso de Leitura**: A barra laranja no topo usa `animation-timeline: scroll(root)`. Ela cresce de 0% a 100% conforme você faz scroll do início ao fim da página.
2.  **Efeitos de Revelação (Reveal on Scroll)**: Os blocos de conteúdo usam `animation-timeline: view()`. Eles começam invisíveis e menores, e ganham opacidade e tamanho conforme entram na área visível da tela.
3.  **Controle de Alcance**: Usamos `animation-range` para definir exatamente em que ponto da entrada/saída do elemento a animação deve começar e terminar.

## Por que isso é incrível?
Antes, precisávamos de bibliotecas pesadas (como GSAP ou ScrollMagic) ou ouvir o evento de scroll no JavaScript (o que pode causar lentidão na página). Agora, o navegador faz tudo isso de forma nativa e extremamente otimizada.

## Como funciona (Resumo):
1.  Crie uma animação normal com `@keyframes`.
2.  Aplique ao elemento.
3.  Defina `animation-timeline: scroll()` para o progresso da página toda.
4.  Defina `animation-timeline: view()` para o progresso do elemento entrando/saindo da tela.
