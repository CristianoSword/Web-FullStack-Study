/**
 * Store Core
 * Gerencia o estado imutável e a lógica de despacho de ações
 */
export class Store {
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState;
        this.listeners = [];
        
        // Histórico para Time-Travel
        this.history = [initialState];
        this.currentIndex = 0;
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        // Reduz o novo estado
        const newState = this.reducer(this.state, action);
        
        // Se o estado mudou, atualiza histórico e notifica
        if (newState !== this.state) {
            this.state = newState;
            
            // Remove histórico futuro se estivermos no meio de um undo
            this.history = this.history.slice(0, this.currentIndex + 1);
            this.history.push(this.state);
            this.currentIndex++;
            
            this.notify();
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Navegação no Tempo
    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.state = this.history[this.currentIndex];
            this.notify();
        }
    }

    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.state = this.history[this.currentIndex];
            this.notify();
        }
    }

    jumpTo(index) {
        if (index >= 0 && index < this.history.length) {
            this.currentIndex = index;
            this.state = this.history[this.currentIndex];
            this.notify();
        }
    }
}
