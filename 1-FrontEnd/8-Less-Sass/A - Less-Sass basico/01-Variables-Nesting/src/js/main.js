// ==========================================================================
// Javascript - Interactive Scripting & UI Logic
// Topic: [05/06] Validation & Interaction Fixes (Live Tabs & Dynamic Theme Selector)
// Project: 01-Variables-Nesting (Futuristic Developer Profile Card)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🛸 Cyber Profile Card initialized successfully.');

  // --- Dynamic Tab Switcher ---
  const tabNav = document.getElementById('tab-navigation');
  const tabButtons = tabNav.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // 1. Remove active state from all buttons
      tabButtons.forEach(btn => btn.classList.remove('nav-tab--active'));
      
      // 2. Remove active state from all panes
      tabPanes.forEach(pane => pane.classList.remove('tab-pane--active'));

      // 3. Add active state to selected button
      button.classList.add('nav-tab--active');

      // 4. Show corresponding pane with fade-in animation
      const targetPane = document.getElementById(`pane-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('tab-pane--active');
      }

      console.log(`📂 Switched to tab: ${targetTab}`);
    });
  });

  // --- Live Theme Switcher (Dark Mode / Light Mode) ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeText = document.getElementById('theme-text');
  const themeIcon = themeToggle.querySelector('i');
  const body = document.body;

  // Check user preference in localStorage if exists
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    enableLightTheme();
  }

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('theme-light')) {
      disableLightTheme();
    } else {
      enableLightTheme();
    }
  });

  function enableLightTheme() {
    body.classList.add('theme-light');
    themeText.textContent = 'Modo Escuro';
    themeIcon.className = 'fa-solid fa-sun';
    localStorage.setItem('theme', 'light');
    console.log('☀️ Light Theme Enabled (Sass variables adapted via parent selector nesting)');
  }

  function disableLightTheme() {
    body.classList.remove('theme-light');
    themeText.textContent = 'Modo Claro';
    themeIcon.className = 'fa-solid fa-moon';
    localStorage.setItem('theme', 'dark');
    console.log('🌙 Dark Theme Enabled (Standard variables fallback)');
  }

  // --- Interactive Footer Stats Trigger ---
  const actionStatsBtn = document.getElementById('action-stats');
  actionStatsBtn.addEventListener('click', () => {
    alert(`📊 Estatísticas de Cristiano Sword:\n\n🚀 Projetos Concluídos: 147\n📈 Produtividade: SSS-Tier\n🔥 Commits Totais: 23,491\n⚡ Frame Rate da Interface: 60+ FPS`);
  });
});
