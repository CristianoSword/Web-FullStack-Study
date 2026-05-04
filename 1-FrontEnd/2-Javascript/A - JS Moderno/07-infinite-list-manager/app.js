/**
 * Infinite List Manager
 * Uso de Generators para processamento sob demanda (Lazy Loading de dados)
 */

const dataList = document.getElementById('data-list');
const loadBtn = document.getElementById('load-next');
const resetBtn = document.getElementById('reset');
const itemCountDisplay = document.getElementById('item-count');

let renderedCount = 0;

/**
 * Generator que produz dados infinitamente ou sob demanda
 * Não ocupa memória com um array gigante, apenas gera o próximo valor quando solicitado
 */
function* dataGenerator(limit = 1000000) {
    let id = 1;
    while (id <= limit) {
        // Simula a criação de um objeto de dados complexo
        yield {
            id: id++,
            timestamp: new Date().toLocaleTimeString(),
            hash: Math.random().toString(36).substring(7)
        };
    }
}

// Instancia o generator
let generator = dataGenerator();

function renderNextBatch(batchSize = 20) {
    for (let i = 0; i < batchSize; i++) {
        const { value, done } = generator.next();
        
        if (done) {
            loadBtn.disabled = true;
            loadBtn.textContent = 'Fim dos Dados';
            break;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="data-id">#${value.id}</span>
            <span>HASH: ${value.hash}</span>
            <span class="data-timestamp">${value.timestamp}</span>
        `;
        dataList.appendChild(li);
        renderedCount++;
    }
    
    itemCountDisplay.textContent = renderedCount.toLocaleString();
    
    // Scroll suave para o fim da lista
    dataList.scrollTop = dataList.scrollHeight;
}

loadBtn.addEventListener('click', () => renderNextBatch());

resetBtn.addEventListener('click', () => {
    dataList.innerHTML = '';
    renderedCount = 0;
    itemCountDisplay.textContent = '0';
    generator = dataGenerator();
    loadBtn.disabled = false;
    loadBtn.textContent = 'Processar Próximo Lote (Generators)';
});

// Lote inicial
renderNextBatch(10);
