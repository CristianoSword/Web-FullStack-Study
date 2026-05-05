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
    }

    createAsset(filename) {
        const content = files[filename];
        
        // Regex simples para capturar imports (Simulando um Parser AST)
        const dependencies = [];
        const importRegex = /import\s+.*\s+from\s+['"]\.\/(.*)['"]/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
            dependencies.push(match[1]);
        }

        return {
            filename,
            content,
            dependencies
        };
    }

    buildGraph() {
        const mainAsset = this.createAsset(this.entry);
        const queue = [mainAsset];

        for (const asset of queue) {
            asset.mapping = {};
            asset.dependencies.forEach(relativePath => {
                const child = this.createAsset(relativePath);
                asset.mapping[relativePath] = child.filename;
                queue.push(child);
            });
        }
        return queue;
    }
}

export const bundler = new MiniBundler('index.js');
