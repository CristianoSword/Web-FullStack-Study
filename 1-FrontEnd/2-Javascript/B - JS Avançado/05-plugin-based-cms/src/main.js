import { cms } from './core.js';
import { MarkdownPlugin } from './plugins/markdown.js';
import { ImageOptimizerPlugin } from './plugins/image.js';

// Inicialização com plugins registrados
cms.register(new MarkdownPlugin());
cms.register(new ImageOptimizerPlugin());

console.log('CMS Engine Started');
