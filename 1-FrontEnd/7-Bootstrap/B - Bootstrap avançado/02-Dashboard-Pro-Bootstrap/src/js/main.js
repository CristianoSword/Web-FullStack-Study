import { WIDGETS } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  renderWidgets(WIDGETS);
  setupSimulation();
});

function renderWidgets(items) {
  const container = document.getElementById('widgets-container');
  if (!container) return;

  container.innerHTML = items.map(w => `
    <div class="col-md-4 mb-4">
      <div id="${w.id}-card" class="card h-100 p-4 widget-card border-secondary text-light bg-dark-purple">
        <span class="text-secondary small text-uppercase fw-bold">${w.title}</span>
        <h3 id="${w.id}-value" class="display-6 fw-bold text-light my-3">${w.value}</h3>
        <span id="${w.id}-diff" class="badge bg-opacity-15 text-light align-self-start py-2 px-3 ${w.positive ? 'bg-success' : 'bg-danger'}">
          ${w.difference} desde ontem
        </span>
      </div>
    </div>
  `).join('');
}

function setupSimulation() {
  const simulateBtn = document.getElementById('simulate-telemetry-btn');
  if (!simulateBtn) return;

  simulateBtn.addEventListener('click', () => {
    // Random network latency update
    const randomLatency = Math.floor(Math.random() * 15) + 5; // 5ms - 20ms
    const latencyVal = document.getElementById('w-2-value');
    if (latencyVal) {
      latencyVal.innerText = `${randomLatency}ms`;
      triggerCardHighlight('w-2-card');
    }

    // Random error rate update
    const randomError = (Math.random() * 0.08).toFixed(3); // 0.00% - 0.08%
    const errorVal = document.getElementById('w-3-value');
    if (errorVal) {
      errorVal.innerText = `${randomError}%`;
      triggerCardHighlight('w-3-card');
    }
  });
}

function triggerCardHighlight(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;

  card.classList.add('widget-pulse');
  setTimeout(() => {
    card.classList.remove('widget-pulse');
  }, 1000);
}
