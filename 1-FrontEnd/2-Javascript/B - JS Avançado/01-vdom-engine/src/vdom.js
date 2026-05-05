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

/**
 * diff()
 * Identifica o que mudou entre o VNode antigo e o novo
 */
export function diff(oldVNode, newVNode) {
    // 1. Se o novo é null, o elemento foi removido
    if (newVNode === undefined) {
        return (node) => {
            node.remove();
            return undefined;
        };
    }

    // 2. Se as tags são diferentes, substitui o elemento inteiro
    if (oldVNode.tag !== newVNode.tag) {
        return (node) => {
            const newNode = render(newVNode, node.parentElement);
            node.remove();
            return newNode;
        };
    }

    // 3. Se são o mesmo elemento, verifica filhos e propriedades
    return (node) => {
        patchProps(node, oldVNode.props, newVNode.props);
        patchChildren(node, oldVNode.children, newVNode.children);
        return node;
    };
}

function patchProps(node, oldProps, newProps) {
    // Adiciona novas props
    Object.keys(newProps).forEach(name => {
        if (newProps[name] !== oldProps[name]) {
            node[name] = newProps[name];
        }
    });
    // Remove props antigas
    Object.keys(oldProps).forEach(name => {
        if (!(name in newProps)) {
            node[name] = undefined;
        }
    });
}

function patchChildren(parent, oldChildren, newChildren) {
    const childPatches = [];
    oldChildren.forEach((oldChild, i) => {
        childPatches.push(diff(oldChild, newChildren[i]));
    });

    const additionalPatches = [];
    for (const additionalChild of newChildren.slice(oldChildren.length)) {
        additionalPatches.push((node) => {
            render(additionalChild, node);
            return node;
        });
    }

    // Aplica os patches nos filhos existentes
    parent.childNodes.forEach((child, i) => {
        if (childPatches[i]) childPatches[i](child);
    });

    // Adiciona novos filhos
    additionalPatches.forEach(patch => patch(parent));
}
