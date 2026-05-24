import { THEME_ELEMENTS } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  renderShowcase();
  setupBrightnessControls();
});

function renderShowcase() {
  const container = document.getElementById('theme-elements-container');
  if (!container) return;

  container.innerHTML = THEME_ELEMENTS.map(el => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 p-4 border-secondary bg-dark text-light shadow-sm">
        <h4 class="h6 mb-3 text-secondary text-uppercase">${el.name}</h4>
        <div class="mb-4">
          <div class="${el.class}">${el.name.split(' ')[0]}</div>
        </div>
        <p class="small text-secondary mb-0">${el.description}</p>
      </div>
    </div>
  `).join('');
}

function setupBrightnessControls() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const currentBg = root.style.getPropertyValue('--bg-app') || '#05020c';
    
    if (currentBg === '#05020c') {
      root.style.setProperty('--bg-app', '#160f29');
      toggleBtn.innerText = 'Alternar para Modo Profundo';
    } else {
      root.style.setProperty('--bg-app', '#05020c');
      toggleBtn.innerText = 'Alternar para Modo Suave';
    }
  });
}
