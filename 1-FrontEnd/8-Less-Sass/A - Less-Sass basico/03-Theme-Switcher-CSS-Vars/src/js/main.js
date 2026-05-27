document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-theme-btn]');
  const codeDisplay = document.querySelector('code');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Remove active state from all buttons
      buttons.forEach(b => b.classList.remove('theme-option--active'));
      // 2. Add active state to clicked button
      btn.classList.add('theme-option--active');

      // 3. Switch theme attribute on html root
      const theme = btn.getAttribute('data-theme-btn');
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update info box
      codeDisplay.textContent = `[data-theme="${theme}"] { ... }`;
      console.log(`🎨 Theme switched to: ${theme}`);
    });
  });
});
