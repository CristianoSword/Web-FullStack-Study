/**
 * Virtual File System
 * Simula arquivos JS no disco para o Bundler processar
 */
export const files = {
    'index.js': `import { message } from './message.js';\nconsole.log(message);`,
    'message.js': `import { name } from './name.js';\nexport const message = "Olá, " + name;`,
    'name.js': `export const name = "Mundo JS!";`
};

/**
 * MiniBundler
 * Resolve dependências e agrupa em um arquivo único
 */
class MiniBundler {
    constructor(entryFile) {
        this.entry = entryFile;
        this.graph = [];
    }

    // Será implementado no Commit 2
    buildGraph() {
        console.log('Construindo Grafo de Dependências...');
    }
}

export const bundler = new MiniBundler('index.js');
