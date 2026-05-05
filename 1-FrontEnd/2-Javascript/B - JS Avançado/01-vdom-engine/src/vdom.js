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
