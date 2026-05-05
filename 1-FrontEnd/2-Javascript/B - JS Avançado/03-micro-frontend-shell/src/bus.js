/**
 * Global Event Bus
 * Permite a comunicação desacoplada entre micro-apps
 */
class EventBus {
    constructor() {
        this.events = {};
        this.statusEl = document.getElementById('bus-status');
    }

    subscribe(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    publish(event, data) {
        if (!this.events[event]) return;
        
        this.statusEl.textContent = `Event Bus: ${event}`;
        this.statusEl.classList.add('active');
        setTimeout(() => this.statusEl.classList.remove('active'), 2000);

        this.events[event].forEach(callback => callback(data));
    }
}

export const eventBus = new EventBus();

// Registro das Micro-Apps
import { orchestrator } from './orchestrator.js';

orchestrator.register('dashboard', {
    route: '/',
    entry: './apps/dashboard.js'
});

orchestrator.register('profile', {
    route: '/profile',
    entry: './apps/profile.js'
});
