import { FEATURES, TESTIMONIALS } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  renderFeatures();
  renderTestimonials();
  setupSmoothScroll();
});

function renderFeatures() {
  const container = document.getElementById('features-container');
  if (!container) return;

  container.innerHTML = FEATURES.map(f => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 feature-card p-4 text-center">
        <div class="feature-icon mb-3">${f.icon}</div>
        <h4 class="h5 mb-3 text-light">${f.title}</h4>
        <p class="text-secondary small mb-0">${f.description}</p>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="col-md-6 mb-4">
      <div class="card h-100 testimonial-card p-4">
        <p class="quote-text text-secondary mb-4">"${t.quote}"</p>
        <div class="d-flex align-items-center">
          <img src="${t.avatar}" class="rounded-circle me-3" width="50" height="50" alt="${t.name}">
          <div>
            <h5 class="h6 mb-0 text-light">${t.name}</h5>
            <span class="text-muted small">${t.role}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
