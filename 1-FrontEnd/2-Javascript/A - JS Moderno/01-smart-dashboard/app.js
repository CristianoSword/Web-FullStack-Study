/**
 * Core de Reatividade Nativa
 * Utiliza Proxy para interceptar mudanças no estado e atualizar o DOM
 */

const createState = (initialState, callback) => {
    return new Proxy(initialState, {
        set(target, key, value) {
            const result = Reflect.set(target, key, value);
            // Sempre que o estado mudar, chamamos o callback de atualização
            callback(key, value);
            return result;
        },
        get(target, key) {
            return Reflect.get(target, key);
        }
    });
};

// Referências de DOM
const elements = document.querySelectorAll('[data-bind]');
const inputs = document.querySelectorAll('[data-model]');

// Função de sincronização com o DOM
const updateDOM = (key, value) => {
    // Atualiza elementos com data-bind
    elements.forEach(el => {
        if (el.dataset.bind === key) {
            el.textContent = value;
        }
    });
    // Atualiza inputs com data-model (Two-way binding)
    inputs.forEach(input => {
        if (input.dataset.model === key && input.value !== value) {
            input.value = value;
        }
    });
};

// Inicialização do Estado
const state = createState({
    visitors: 0,
    conversions: 0,
    successRate: '0%',
    status: 'Sistema Inicializado e Monitorando...'
}, (key, value) => {
    updateDOM(key, value);
    
    // Lógica calculada: Se visitantes ou conversões mudarem, recalcula taxa
    if (key === 'visitors' || key === 'conversions') {
        const rate = state.visitors > 0 
            ? ((state.conversions / state.visitors) * 100).toFixed(1) 
            : 0;
        state.successRate = `${rate}%`;
    }
});

export default state;
