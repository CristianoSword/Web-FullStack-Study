import { PORTFOLIO_ITEMS } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio(PORTFOLIO_ITEMS);
  setupFilterListeners();
});

function renderPortfolio(items) {
  const container = document.getElementById('portfolio-grid-container');
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="col-md-4 mb-4 portfolio-item-wrapper" data-category="${item.category}">
      <div class="card h-100 portfolio-card border-secondary text-light bg-dark p-0 overflow-hidden">
        <div style="overflow: hidden; height: 200px;">
          <img src="${item.image}" class="card-img-top portfolio-img" alt="${item.title}" style="height: 100%; object-fit: cover; transition: transform 0.5s;">
        </div>
        <div class="card-body p-4">
          <span class="text-info small text-uppercase fw-bold font-monospace">${item.category}</span>
          <h4 class="h5 text-light mt-2 mb-3">${item.title}</h4>
          <p class="text-secondary small mb-0">${item.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function setupFilterListeners() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active', 'btn-neon'));
      filterButtons.forEach(b => b.classList.add('btn-outline-secondary'));
      
      this.classList.add('active', 'btn-neon');
      this.classList.remove('btn-outline-secondary');
      
      const filterValue = this.getAttribute('data-filter');
      
      const items = document.querySelectorAll('.portfolio-item-wrapper');
      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.classList.remove('d-none');
          item.classList.add('animate-fade-in');
        } else {
          item.classList.add('d-none');
        }
      });
    });
  });
}
