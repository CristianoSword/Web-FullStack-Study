document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.icon-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const text = card.querySelector('span').textContent;
      const icon = card.querySelector('i');
      const classList = icon.className;
      
      console.log(`📋 Copied: ${text} | Classes: ${classList}`);
      alert(`Copied utility classes for ${text}:\n${classList}`);
    });
  });
});
