/**
 * Audio Visualizer
 * Manipulação de AudioContext e AnalyserNode
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const audioUpload = document.getElementById('audio-upload');
const playPauseBtn = document.getElementById('play-pause');
const trackName = document.getElementById('track-name');

let audioSource;
let analyser;
let audioCtx;
let isPlaying = false;
const audio = new Audio();

// Configuração do Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Manipulação de Arquivo
audioUpload.addEventListener('change', function() {
    const files = this.files;
    if (files.length === 0) return;

    const file = files[0];
    audio.src = URL.createObjectURL(file);
    trackName.textContent = file.name;
    playPauseBtn.disabled = false;
    
    setupAudioContext();
});

function setupAudioContext() {
    if (audioCtx) return; // Já configurado

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    audioSource = audioCtx.createMediaElementSource(audio);
    
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    // Configurações do Analisador
    analyser.fftSize = 256; // Número de frequências (precisa ser potência de 2)
}

playPauseBtn.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶️ Play';
    } else {
        audio.play();
        playPauseBtn.textContent = '⏸️ Pause';
        animate(); // Inicia animação
    }
    isPlaying = !isPlaying;
});

export { canvas, ctx, analyser, audio };
