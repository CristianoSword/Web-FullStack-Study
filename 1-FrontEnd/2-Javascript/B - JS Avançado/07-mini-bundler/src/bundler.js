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

    bundle(graph) {
        let modules = '';

        graph.forEach(mod => {
            // Cada módulo é encapsulado em uma função para isolar o escopo
            modules += `
            '${mod.filename}': function(require, module, exports) {
                ${mod.content.replace(/import.*from.*/g, '')} // Mock de remoção de import
            },`;
        });

        const result = `
        (function(modules) {
            function require(filename) {
                const fn = modules[filename];
                const module = { exports: {} };
                fn(require, module, module.exports);
                return module.exports;
            }
            require('${this.entry}');
        })({${modules}})
        `;

        return result;
    }
}

export const bundler = new MiniBundler('index.js');

// --- UI Logic ---
const fileList = document.getElementById('file-list');
const buildBtn = document.getElementById('build-btn');
const output = document.getElementById('bundle-output');

// Renderiza arquivos virtuais
Object.keys(files).forEach(name => {
    const div = document.createElement('div');
    div.className = 'file-item';
    div.innerHTML = `<strong>${name}</strong><br><code>${files[name]}</code>`;
    fileList.appendChild(div);
});

buildBtn.onclick = () => {
    const graph = bundler.buildGraph();
    const code = bundler.bundle(graph);
    output.textContent = code;
    console.log('%c [Bundler] Build concluído com sucesso!', 'color: #3b82f6; font-weight: bold;');
};
