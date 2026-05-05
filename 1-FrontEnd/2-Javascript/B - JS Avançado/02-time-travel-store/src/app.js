import { Store } from './store.js';

// 1. Definição do Reducer (Puro e Imutável)
const counterReducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'JUMP_TO':
            return action.payload; // Usado pelo Time Travel
        default:
            return state;
    }
};

// 2. Inicialização da Store
const initialState = { count: 0 };
const store = new Store(counterReducer, initialState);

// 3. Referências de DOM
const display = document.getElementById('counter-display');
const historyList = document.getElementById('history-list');

// 4. Inscrição para atualizações de UI
store.subscribe((state) => {
    display.textContent = state.count;
    renderHistory();
});

function renderHistory() {
    historyList.innerHTML = '';
    store.history.forEach((state, index) => {
        const li = document.createElement('li');
        li.className = index === store.currentIndex ? 'active' : '';
        li.textContent = `Estado #${index} [count: ${state.count}]`;
        li.onclick = () => jumpTo(index);
        historyList.appendChild(li);
    });
}

function jumpTo(index) {
    // Lógica que será implementada no Commit 4
    console.log('Jumping to index:', index);
}

// 5. Eventos
document.getElementById('increment').onclick = () => store.dispatch({ type: 'INCREMENT' });
document.getElementById('decrement').onclick = () => store.dispatch({ type: 'DECREMENT' });

export default store;
