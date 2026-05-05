import { h, render, diff } from './vdom.js';

const container = document.getElementById('app');
const updateBtn = document.getElementById('update-btn');

let count = 0;

/**
 * Função que gera a Árvore Virtual baseada no estado
 */
const view = (state) => h('div', { id: 'vdom-root' },
    h('h1', {}, 'V-DOM Engine Core'),
    h('p', {}, `Contagem de Atualizações: ${state}`),
    h('div', { className: 'list' },
        ...Array.from({ length: state % 5 + 1 }, (_, i) => 
            h('div', { className: 'item' }, 
                h('span', {}, `Item Dinâmico #${i + 1}`),
                h('span', { style: 'color: #38bdf8' }, '✓ Ativo')
            )
        )
    ),
    h('p', { style: 'margin-top: 1rem; color: #94a3b8; font-size: 0.8rem;' }, 
        state % 2 === 0 ? '✨ Estado Par - Renderização Otimizada' : '⚡ Estado Ímpar - Patching em Tempo Real'
    )
);

// Renderização Inicial
let vnode = view(count);
let rootNode = render(vnode, container);

// Loop de Atualização (Patching)
updateBtn.addEventListener('click', () => {
    count++;
    const newVNode = view(count);
    
    // Calcula as diferenças e aplica o patch
    const patch = diff(vnode, newVNode);
    rootNode = patch(rootNode);
    
    // Atualiza a referência do vnode antigo
    vnode = newVNode;
    
    console.log(`%c Patch aplicado para o estado: ${count}`, 'color: #38bdf8; font-weight: bold;');
});
