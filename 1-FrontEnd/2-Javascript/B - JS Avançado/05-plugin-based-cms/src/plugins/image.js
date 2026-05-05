import { BasePlugin } from '../base-plugin.js';

export class ImageOptimizerPlugin extends BasePlugin {
    constructor() {
        super('Image Lab', '🖼️');
    }

    init(container) {
        this.render(container, `
            <div class="plugin-view">
                <h2>Laboratório de Imagem</h2>
                <div class="drop-zone">Arraste uma imagem aqui</div>
                <div class="controls">
                    <button disabled>Otimizar PNG</button>
                    <button disabled>Converter WebP</button>
                </div>
            </div>
        `);
    }
}
