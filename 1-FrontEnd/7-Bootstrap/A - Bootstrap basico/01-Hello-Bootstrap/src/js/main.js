import { COMPONENTS } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  renderComponentShowcase();
  setupAlertTrigger();
  setupSpinnerToggle();
});

function renderComponentShowcase() {
  const container = document.getElementById('components-list-container');
  if (!container) return;

  container.innerHTML = COMPONENTS.map(c => `
    <div class="col-md-6 mb-4">
      <div class="card h-100 p-4 component-showcase-card">
        <div class="d-flex align-items-center mb-3">
          <span class="fs-2 me-3">${c.icon}</span>
          <h3 class="h5 mb-0 text-light">${c.name}</h3>
        </div>
        <p class="text-secondary mb-0">${c.description}</p>
      </div>
    </div>
  `).join('');
}

function setupAlertTrigger() {
  const triggerBtn = document.getElementById('trigger-alert-btn');
  const alertContainer = document.getElementById('dynamic-alert-container');
  
  if (!triggerBtn || !alertContainer) return;

  triggerBtn.addEventListener('click', () => {
    alertContainer.innerHTML = `
      <div class="alert alert-info alert-dismissible fade show border-info bg-dark text-info" role="alert">
        <strong>⚡ Aura Alert:</strong> Componente acionado com sucesso na viewport!
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  });
}

function setupSpinnerToggle() {
  const toggleBtn = document.getElementById('toggle-spinner-btn');
  const spinner = document.getElementById('showcase-spinner');
  
  if (!toggleBtn || !spinner) return;

  toggleBtn.addEventListener('click', () => {
    if (spinner.classList.contains('d-none')) {
      spinner.classList.remove('d-none');
      toggleBtn.innerText = 'Parar Processamento';
      toggleBtn.classList.replace('btn-outline-primary', 'btn-danger');
    } else {
      spinner.classList.add('d-none');
      toggleBtn.innerText = 'Iniciar Processamento';
      toggleBtn.classList.replace('btn-danger', 'btn-outline-primary');
    }
  });
}
