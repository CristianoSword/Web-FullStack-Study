import { BasePlugin } from '../base-plugin.js';

export class MarkdownPlugin extends BasePlugin {
    constructor() {
        super('Markdown Editor', '📝');
    }

    init(container) {
        this.render(container, `
            <div class="plugin-view">
                <h2>Editor Markdown</h2>
                <textarea id="md-input" placeholder="Digite em Markdown..."></textarea>
                <div id="md-preview" class="preview"></div>
            </div>
        `);

        const input = document.getElementById('md-input');
        const preview = document.getElementById('md-preview');

        input.oninput = () => {
            preview.innerHTML = `<strong>Renderizado:</strong><br>${input.value.replace(/\n/g, '<br>')}`;
        };
    }
}
