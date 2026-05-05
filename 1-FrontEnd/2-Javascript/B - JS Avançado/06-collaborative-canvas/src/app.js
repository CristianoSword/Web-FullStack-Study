/**
 * Collaborative Canvas Core
 * Gerencia o desenho local e emite eventos para sincronização
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brushColor = document.getElementById('brush-color');
const brushSize = document.getElementById('brush-size');
const clearBtn = document.getElementById('clear-btn');

let drawing = false;

// Setup Canvas Size
function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 600;
}
window.onresize = resize;
resize();

// Lógica de Desenho
function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Emitir evento de desenho (Será implementado no Commit 2)
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

clearBtn.onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

export { ctx, canvas };
