/**
 * Main Thread
 * Gerencia o Canvas e a comunicação com o Worker
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('image-input');
const overlay = document.getElementById('loading-overlay');
const timeMetric = document.getElementById('time-metric');
const statusMetric = document.getElementById('status-metric');

// Inicializa o Worker
const worker = new Worker(new URL('./worker.js', import.meta.url));

let originalImageData = null;

// Handler de upload
imageInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        statusMetric.textContent = 'Imagem Carregada';
    };
    img.src = URL.createObjectURL(file);
};

// Função para aplicar filtro via Worker
function applyFilter(filterType) {
    if (!originalImageData) return alert('Carregue uma imagem primeiro!');

    overlay.classList.remove('hidden');
    const startTime = performance.now();
    statusMetric.textContent = `Processando ${filterType}...`;

    // Criamos uma cópia dos dados para enviar
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Envia para o Worker usando Transferable Objects (buffer)
    worker.postMessage({ imageData, filterType }, [imageData.data.buffer]);

    worker.onmessage = (e) => {
        const { imageData: processedData } = e.data;
        ctx.putImageData(processedData, 0, 0);
        
        const endTime = performance.now();
        timeMetric.textContent = `${Math.round(endTime - startTime)}ms`;
        statusMetric.textContent = 'Filtro Aplicado';
        overlay.classList.add('hidden');
    };
}

// Eventos dos botões
document.getElementById('grayscale-btn').onclick = () => applyFilter('grayscale');
document.getElementById('invert-btn').onclick = () => applyFilter('invert');
document.getElementById('brightness-btn').onclick = () => applyFilter('brightness');
