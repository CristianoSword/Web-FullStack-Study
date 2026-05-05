import { BasePlugin } from '../base-plugin.js';

export class SEOPlugin extends BasePlugin {
    constructor() {
        super('SEO Analyzer', '📈');
    }

    init(container) {
        this.render(container, `
            <div class="plugin-view">
                <h2>Analisador de SEO</h2>
                <p>Este plugin foi carregado dinamicamente via <code>import()</code>.</p>
                <div class="metrics">
                    <p>Score: 85/100</p>
                    <p>Palavras-chave: 12 detectadas</p>
                </div>
            </div>
        `);
    }
}
