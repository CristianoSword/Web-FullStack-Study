/**
 * CMS Core
 * Gerencia o ciclo de vida dos plugins
 */

class CMSCore {
    constructor() {
        this.plugins = new Map();
        this.toolbar = document.getElementById('cms-toolbar');
        this.view = document.getElementById('editor-view');
        this.stats = document.getElementById('plugin-stats');
    }

    register(plugin) {
        if (this.plugins.has(plugin.name)) return;
        
        console.log(`Core: Registrando plugin [${plugin.name}]`);
        this.plugins.set(plugin.name, plugin);
        
        this.renderPluginButton(plugin);
        this.updateStats();
    }

    renderPluginButton(plugin) {
        const btn = document.createElement('button');
        btn.textContent = plugin.icon + ' ' + plugin.name;
        btn.onclick = () => this.activatePlugin(plugin.name);
        this.toolbar.appendChild(btn);
    }

    activatePlugin(name) {
        const plugin = this.plugins.get(name);
        if (plugin) {
            this.view.innerHTML = '';
            plugin.init(this.view);
        }
    }

    updateStats() {
        this.stats.textContent = `Plugins Ativos: ${this.plugins.size}`;
    }
}

export const cms = new CMSCore();
