/**
 * Micro-Frontend Orchestrator
 * Gerencia o roteamento e o carregamento dinâmico de aplicações
 */

class Orchestrator {
    constructor() {
        this.apps = new Map();
        this.container = document.getElementById('app-container');
        this.init();
    }

    register(name, config) {
        this.apps.set(name, config);
    }

    async loadApp(path) {
        const route = path || '/';
        const appConfig = Array.from(this.apps.values()).find(app => app.route === route);

        if (!appConfig) {
            this.container.innerHTML = '<h1>404 - App Not Found</h1>';
            return;
        }

        this.container.innerHTML = '<div class="loader">Loading App...</div>';

        try {
            // Simula o carregamento dinâmico de um módulo
            const module = await import(appConfig.entry);
            
            // Limpa o container e inicializa a app
            this.container.innerHTML = '';
            module.mount(this.container);
        } catch (error) {
            console.error('Failed to load micro-app:', error);
            this.container.innerHTML = '<h1>Error loading application</h1>';
        }
    }

    init() {
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.replace('#', '') || '/';
            this.loadApp(path);
        });

        // Carga inicial
        const initialPath = window.location.hash.replace('#', '') || '/';
        this.loadApp(initialPath);
    }
}

export const orchestrator = new Orchestrator();
