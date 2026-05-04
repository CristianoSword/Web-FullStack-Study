/**
 * Performance Gallery
 * Lazy Loading com Intersection Observer
 */

const gallery = document.getElementById('gallery');
const sentinel = document.getElementById('sentinel');
const metricsDisplay = document.getElementById('perf-metrics');

let imageCount = 0;

// Função para gerar URLs de imagens aleatórias (Picsum)
const getImageUrl = () => `https://picsum.photos/600/400?random=${Math.random()}`;

// Cria o observer para carregar imagens conforme entram no scroll
const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;
            const img = container.querySelector('img');
            
            // Carrega a imagem real
            img.src = img.dataset.src;
            
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.onload = () => img.classList.add('loaded');
            }
            
            // Para de observar este container
            observer.unobserve(container);
        }
    });
}, {
    rootMargin: '100px' // Começa a carregar 100px antes de entrar na tela
});

// Função para adicionar imagens ao DOM
function addImages(count = 6) {
    for (let i = 0; i < count; i++) {
        const container = document.createElement('div');
        container.className = 'image-container';
        
        const img = document.createElement('img');
        img.dataset.src = getImageUrl();
        img.alt = `Imagem aleatória ${++imageCount}`;
        
        container.appendChild(img);
        gallery.appendChild(container);
        
        // Inicia a observação
        imgObserver.observe(container);
    }
}

// Observer para o Scroll Infinito (Sentinela)
const sentinelObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        addImages(4);
    }
});

sentinelObserver.observe(sentinel);

// Inicialização
addImages(8);

/**
 * Performance Monitoring
 */
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
                metricsDisplay.textContent = `FCP: ${entry.startTime.toFixed(2)}ms | `;
            }
            if (entry.entryType === 'largest-contentful-paint') {
                metricsDisplay.textContent += `LCP: ${entry.startTime.toFixed(2)}ms`;
            }
        });
    });

    observer.observe({ type: 'paint', buffered: true });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
} else {
    metricsDisplay.textContent = "Métricas de performance não suportadas neste navegador.";
}
