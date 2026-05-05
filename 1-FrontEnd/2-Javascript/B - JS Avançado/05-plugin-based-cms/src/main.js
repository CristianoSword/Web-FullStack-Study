import { cms } from './core.js';
import { MarkdownPlugin } from './plugins/markdown.js';
import { ImageOptimizerPlugin } from './plugins/image.js';

// Inicialização com plugins registrados
cms.register(new MarkdownPlugin());
cms.register(new ImageOptimizerPlugin());

document.getElementById('load-dynamic-btn').onclick = async () => {
    // Simula carregamento dinâmico de um plugin pesado
    const { SEOPlugin } = await import('./plugins/seo.js');
    cms.register(new SEOPlugin());
    document.getElementById('load-dynamic-btn').remove();
};

console.log('CMS Engine Started');
