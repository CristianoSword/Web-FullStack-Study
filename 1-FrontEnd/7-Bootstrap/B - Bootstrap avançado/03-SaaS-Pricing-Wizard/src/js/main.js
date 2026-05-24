import { PLANS } from './models.js';

let isAnnual = false;

document.addEventListener('DOMContentLoaded', () => {
  renderPlans();
  setupBillingToggle();
});

function renderPlans() {
  const container = document.getElementById('pricing-plans-container');
  if (!container) return;

  container.innerHTML = PLANS.map(plan => {
    const activePrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    
    return `
      <div class="col-lg-4 mb-4">
        <div class="card h-100 pricing-card p-4 position-relative ${plan.popular ? 'border-info bg-dark-purple' : 'border-secondary bg-dark'} text-light">
          ${plan.popular ? '<span class="badge position-absolute top-0 end-0 m-3 badge-neon px-3 py-2">Mais Popular</span>' : ''}
          
          <div class="mb-4">
            <h3 class="h5 text-secondary text-uppercase">${plan.name}</h3>
            <div class="d-flex align-items-baseline mt-3">
              <span class="fs-2 text-light fw-bold">R$</span>
              <span class="display-5 text-light fw-bold font-monospace mx-1">${activePrice.toFixed(0)}</span>
              <span class="text-secondary small">/mês</span>
            </div>
            ${isAnnual ? `<span class="text-info small font-monospace">Cobrado anualmente</span>` : ''}
          </div>

          <ul class="list-unstyled mb-5">
            ${plan.features.map(f => `
              <li class="mb-3 d-flex align-items-center small text-secondary">
                <span class="text-info me-2">✔</span> ${f}
              </li>
            `).join('')}
          </ul>

          <button class="btn ${plan.popular ? 'btn-neon' : 'btn-outline-secondary text-light'} w-100 py-3 rounded-3 text-uppercase fw-bold small" onclick="alert('⚡ Checkout iniciado para o plano ${plan.name}!')">
            Assinar Plano
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setupBillingToggle() {
  const toggle = document.getElementById('billingSwitch');
  if (!toggle) return;

  toggle.addEventListener('change', (e) => {
    isAnnual = e.target.checked;
    renderPlans();
  });
}
