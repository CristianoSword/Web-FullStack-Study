import { eventBus } from '../bus.js';

export function mount(container) {
    container.innerHTML = `
        <div class="app-card">
            <h2>📊 Dashboard Micro-App</h2>
            <p>Bem-vindo ao centro de controle.</p>
            <button id="send-event">Enviar Alerta via Bus</button>
        </div>
    `;

    document.getElementById('send-event').onclick = () => {
        eventBus.publish('ALERT', { message: 'Ação realizada no Dashboard!' });
    };
}
