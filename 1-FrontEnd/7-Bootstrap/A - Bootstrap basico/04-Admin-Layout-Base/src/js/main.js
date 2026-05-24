import { MENU_ITEMS } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
  renderSidebarMenu();
  setupSidebarToggle();
});

function renderSidebarMenu() {
  const container = document.getElementById('sidebar-menu');
  if (!container) return;

  container.innerHTML = MENU_ITEMS.map(item => `
    <li class="nav-item mb-2">
      <a href="${item.link}" class="nav-link text-secondary sidebar-link py-3 px-4 d-flex align-items-center rounded-3 ${item.active ? 'active text-light bg-dark-purple' : ''}">
        <span class="fs-5 me-3">${item.icon}</span>
        <span class="link-text">${item.title}</span>
      </a>
    </li>
  `).join('');

  // Setup click transitions for items
  const links = container.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    link.addEventListener('click', function() {
      links.forEach(l => l.classList.remove('active', 'text-light', 'bg-dark-purple'));
      links.forEach(l => l.classList.add('text-secondary'));
      
      this.classList.add('active', 'text-light', 'bg-dark-purple');
      this.classList.remove('text-secondary');
    });
  });
}

function setupSidebarToggle() {
  const toggleBtn = document.getElementById('sidebarCollapse');
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');

  if (!toggleBtn || !sidebar || !content) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    content.classList.toggle('active');
  });
}
