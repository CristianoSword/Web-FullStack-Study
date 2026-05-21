/**
 * Custom Vue Directives Library
 */

// 1. Tooltip Directive
export const vTooltip = {
  mounted(el, binding) {
    el.addEventListener('mouseenter', () => {
      const tooltipText = binding.value || '';
      if (!tooltipText) return;

      const tooltip = document.createElement('div');
      tooltip.className = 'aura-tooltip-bubble';
      tooltip.innerText = tooltipText;

      // Detect requested position (top, bottom, left, right)
      const position = binding.arg || 'top';
      tooltip.classList.add(`pos-${position}`);

      document.body.appendChild(tooltip);
      el._auraTooltip = tooltip;

      // Position logic based on bound target element boundary rect
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      // Wait for DOM layout sizing to calculate coordinates
      const tooltipRect = tooltip.getBoundingClientRect();

      if (position === 'top') {
        top = rect.top + scrollY - tooltipRect.height - 8;
        left = rect.left + scrollX + (rect.width - tooltipRect.width) / 2;
      } else if (position === 'bottom') {
        top = rect.bottom + scrollY + 8;
        left = rect.left + scrollX + (rect.width - tooltipRect.width) / 2;
      } else if (position === 'left') {
        top = rect.top + scrollY + (rect.height - tooltipRect.height) / 2;
        left = rect.left + scrollX - tooltipRect.width - 8;
      } else if (position === 'right') {
        top = rect.top + scrollY + (rect.height - tooltipRect.height) / 2;
        left = rect.right + scrollX + 8;
      }

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      
      // Trigger smooth opacity fade transition
      setTimeout(() => tooltip.classList.add('visible'), 10);
    });

    el.addEventListener('mouseleave', () => {
      if (el._auraTooltip) {
        el._auraTooltip.classList.remove('visible');
        const tempTooltip = el._auraTooltip;
        el._auraTooltip = null;
        setTimeout(() => tempTooltip.remove(), 200);
      }
    });
  },
  unmounted(el) {
    if (el._auraTooltip) {
      el._auraTooltip.remove();
    }
  }
};

// 2. Ripple Directive
export const vRipple = {
  mounted(el) {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';

    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'aura-ripple-wave';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      el.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  }
};

// 3. Intersection Observer Directive
export const vIntersectionObserver = {
  mounted(el, binding) {
    el.classList.add('aura-observe-target');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          
          // Trigger optional binding callback function if supplied
          if (typeof binding.value === 'function') {
            binding.value(el);
          }
          
          // Stop observing after firing once for performance
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(el);
    el._auraObserver = observer;
  },
  unmounted(el) {
    if (el._auraObserver) {
      el._auraObserver.disconnect();
    }
  }
};

// 4. Click Outside Directive
export const vClickOutside = {
  mounted(el, binding) {
    el._auraClickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        if (typeof binding.value === 'function') {
          binding.value(event);
        }
      }
    };
    document.addEventListener('click', el._auraClickOutside);
  },
  unmounted(el) {
    if (el._auraClickOutside) {
      document.removeEventListener('click', el._auraClickOutside);
    }
  }
};
