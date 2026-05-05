/**
 * h() - HyperScript function
 * Cria um objeto de representação virtual do DOM (VNode)
 */
export function h(tag, props, ...children) {
    return {
        tag,
        props: props || {},
        children: children.flat().map(child => 
            typeof child === 'object' ? child : createTextVNode(child)
        )
    };
}

function createTextVNode(text) {
    return {
        tag: 'TEXT_ELEMENT',
        props: { nodeValue: text },
        children: []
    };
}

/**
 * render()
 * Converte VNode em DOM Real
 */
export function render(vnode, container) {
    const dom = vnode.tag === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(vnode.tag);

    // Adiciona propriedades
    Object.keys(vnode.props).forEach(name => {
        dom[name] = vnode.props[name];
    });

    // Renderiza filhos recursivamente
    vnode.children.forEach(child => render(child, dom));

    container.appendChild(dom);
    return dom;
}
