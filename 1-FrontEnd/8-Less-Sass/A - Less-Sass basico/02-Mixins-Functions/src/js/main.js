// ==========================================================================
// Javascript - Interactive Scripting
// Topic: [05/06] Validation/Fixes
// Project: 02-Mixins-Functions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Alert Dismiss ---
  document.querySelectorAll('.alert__close').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-dismiss');
      const el = document.getElementById(id);
      if (el) {
        el.style.transition = 'opacity 0.3s, transform 0.3s';
        el.style.opacity = '0';
        el.style.transform = 'translateX(20px)';
        setTimeout(() => el.remove(), 320);
      }
    });
  });

  // --- Button Variant Switcher (solid / outline / ghost) ---
  const variantBtns = document.querySelectorAll('.variant-toggle button');
  const btnRow = document.getElementById('btn-row');
  const colorClasses = ['btn--primary', 'btn--secondary', 'btn--success', 'btn--danger', 'btn--warning', 'btn--info'];

  variantBtns.forEach(toggle => {
    toggle.addEventListener('click', () => {
      variantBtns.forEach(b => b.classList.remove('active'));
      toggle.classList.add('active');

      const variant = toggle.getAttribute('data-variant'); // '' | 'btn--outline' | 'btn--ghost'

      btnRow.querySelectorAll('.btn').forEach(btn => {
        // Remove previous variant modifiers
        btn.classList.remove('btn--outline', 'btn--ghost');
        // Add new one if any
        if (variant) btn.classList.add(variant);
      });
    });
  });

});
