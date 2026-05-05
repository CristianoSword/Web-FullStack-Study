import { eventBus } from '../bus.js';

export function mount(container) {
    container.innerHTML = `
        <div class="app-card">
            <h2>👤 Profile Micro-App</h2>
            <div id="profile-content">Carregando dados do usuário...</div>
        </div>
    `;

    // Escuta eventos do Bus
    eventBus.subscribe('ALERT', (data) => {
        document.getElementById('profile-content').innerHTML = `
            <div class="notification">Notificação recebida: ${data.message}</div>
        `;
    });
}
