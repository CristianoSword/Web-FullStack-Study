import { PRODUCTS } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(PRODUCTS);
  setupFilterListeners();
});

function renderProducts(items) {
  const container = document.getElementById('products-grid-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-secondary lead">Nenhum produto encontrado nesta categoria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(p => `
    <div class="col-sm-6 col-lg-3 mb-4 product-card-wrapper" data-category="${p.category}">
      <div class="card h-100 product-card p-0">
        <div class="position-relative">
          <img src="${p.image}" class="card-img-top product-image" alt="${p.name}">
          ${p.badge ? `<span class="badge position-absolute top-0 start-0 m-3 px-3 py-2 badge-neon">${p.badge}</span>` : ''}
        </div>
        <div class="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            <span class="text-muted small text-uppercase category-tag mb-2 d-inline-block">${p.category}</span>
            <h4 class="h6 text-light mb-3">${p.name}</h4>
          </div>
          <div class="d-flex align-items-center justify-content-between mt-3">
            <span class="price-text text-light font-monospace fw-bold">R$ ${p.price.toFixed(2)}</span>
            <span class="rating-text text-warning small">★ ${p.rating}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function setupFilterListeners() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Toggle active class
      filterButtons.forEach(b => b.classList.remove('active', 'btn-neon'));
      filterButtons.forEach(b => b.classList.add('btn-outline-secondary'));
      
      this.classList.add('active', 'btn-neon');
      this.classList.remove('btn-outline-secondary');
      
      const filterValue = this.getAttribute('data-filter');
      
      if (filterValue === 'all') {
        renderProducts(PRODUCTS);
      } else {
        const filtered = PRODUCTS.filter(p => p.category === filterValue);
        renderProducts(filtered);
      }
    });
  });
}
