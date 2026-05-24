import { FORM_FIELDS } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  renderFormFields();
  setupFormValidation();
});

function renderFormFields() {
  const container = document.getElementById('dynamic-fields-container');
  if (!container) return;

  container.innerHTML = FORM_FIELDS.map(f => `
    <div class="col-12 mb-3">
      <label for="${f.id}" class="form-label text-secondary small fw-bold text-uppercase">${f.label}</label>
      <input type="${f.type}" class="form-control bg-dark text-light border-secondary" id="${f.id}" placeholder="${f.placeholder}" ${f.required ? 'required' : ''} ${f.type === 'password' ? 'minlength="8"' : ''}>
      <div class="invalid-feedback small">
        ${f.feedback}
      </div>
    </div>
  `).join('');
}

function setupFormValidation() {
  const form = document.getElementById('interactive-form');
  const alertContainer = document.getElementById('success-banner-container');
  if (!form || !alertContainer) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      alertContainer.innerHTML = ''; // Clear previous alerts
    } else {
      form.classList.remove('was-validated');
      form.reset();
      
      alertContainer.innerHTML = `
        <div class="alert alert-success border-success bg-dark text-success p-3 rounded-3" role="alert">
          <strong>⚡ Registro Concluído:</strong> Acesso ativado com sucesso em AuraShell!
        </div>
      `;
    }
  }, false);
}
