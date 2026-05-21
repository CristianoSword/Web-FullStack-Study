/**
 * Directive Option Contratos e Tipos para AuraDirectives
 */

export const TOOLTIP_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
};

export const DIRECTIVE_METADATA = [
  {
    id: 'v-tooltip',
    title: 'v-tooltip 💬',
    description: 'Injeta dinamicamente um balão informativo flutuante com suporte a orientações customizadas (top, bottom, left, right).',
    codeExample: `<button v-tooltip="'Olá! Sou um tooltip premium'">\n  Passe o mouse\n</button>`
  },
  {
    id: 'v-ripple',
    title: 'v-ripple 🌊',
    description: 'Adiciona um efeito reativo de onda de impacto de Material Design na coordenada exata de clique.',
    codeExample: `<button v-ripple class="btn-ripple">\n  Clique e sinta o impacto\n</button>`
  },
  {
    id: 'v-intersection-observer',
    title: 'v-intersection-observer 👁️',
    description: 'Observa visibilidade no viewport e adiciona classes CSS reativas (fade/slide in) de forma automática e performática.',
    codeExample: `<div v-intersection-observer class="scroll-animate">\n  Apareço ao rolar a página\n</div>`
  },
  {
    id: 'v-click-outside',
    title: 'v-click-outside 🔐',
    description: 'Detecta cliques fora da área do elemento. Fundamental para fechar modais, dropdowns e menus de contexto com segurança.',
    codeExample: `<div v-click-outside="closeDropdown">\n  Fecho se clicar fora\n</div>`
  }
];
