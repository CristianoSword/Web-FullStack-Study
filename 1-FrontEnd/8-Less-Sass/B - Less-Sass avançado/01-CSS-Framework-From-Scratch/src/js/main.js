document.addEventListener('DOMContentLoaded', () => {
  console.log('📦 Mini CSS Framework initialized successfully.');

  // Bind clicks on buttons to show simple interactions
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent;
      const classes = btn.className;

      console.log(`🔘 Button Pressed: "${text}" | Class list: ${classes}`);
      alert(`Você clicou no botão "${text}" que utiliza as classes do framework:\n"${classes}"`);
    });
  });
});
