import { ctx, canvas } from './app.js';

/**
 * SyncManager
 * Simula a recepção de dados via WebSocket
 */
class SyncManager {
    constructor() {
        this.simulateRemoteUser();
    }

    // Simula o desenho de um usuário remoto
    simulateRemoteUser() {
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% de chance de o "User B" desenhar
                this.drawRemoteStroke();
            }
        }, 1000);
    }

    drawRemoteStroke() {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#f43f5e'; // Cor do User B
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + (Math.random() - 0.5) * 100, startY + (Math.random() - 0.5) * 100);
        ctx.stroke();
        
        console.log('%c [Sync] Recebido traço do User B', 'color: #f43f5e');
    }

    sendStroke(data) {
        // Aqui enviaria os dados via socket.send()
        // console.log('Enviando dados:', data);
    }
}

export const sync = new SyncManager();
