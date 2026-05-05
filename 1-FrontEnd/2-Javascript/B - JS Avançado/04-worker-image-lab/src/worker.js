/**
 * Image Processor Worker
 * Executa filtros pesados em uma thread separada
 */

self.onmessage = function(e) {
    const { imageData, filterType } = e.data;
    const pixels = imageData.data;
    const len = pixels.length;

    console.log(`Worker: Iniciando filtro ${filterType}...`);

    switch (filterType) {
        case 'grayscale':
            for (let i = 0; i < len; i += 4) {
                const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                pixels[i] = avg;     // R
                pixels[i + 1] = avg; // G
                pixels[i + 2] = avg; // B
            }
            break;

        case 'invert':
            for (let i = 0; i < len; i += 4) {
                pixels[i] = 255 - pixels[i];
                pixels[i + 1] = 255 - pixels[i + 1];
                pixels[i + 2] = 255 - pixels[i + 2];
            }
            break;

        case 'brightness':
            for (let i = 0; i < len; i += 4) {
                pixels[i] = Math.min(255, pixels[i] * 1.5);
                pixels[i + 1] = Math.min(255, pixels[i + 1] * 1.5);
                pixels[i + 2] = Math.min(255, pixels[i + 2] * 1.5);
            }
            break;
    }

    // Retorna os dados processados
    self.postMessage({ imageData }, [imageData.data.buffer]);
};
