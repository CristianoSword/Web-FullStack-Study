document.addEventListener('DOMContentLoaded', () => {
  console.log('📐 Grid system demo initialized.');

  // Responsive breakpoint logging helper
  const logWidth = () => {
    const width = window.innerWidth;
    let breakpoint = 'xs';
    if (width >= 1400) breakpoint = 'xxl';
    else if (width >= 1200) breakpoint = 'xl';
    else if (width >= 992) breakpoint = 'lg';
    else if (width >= 768) breakpoint = 'md';
    else if (width >= 576) breakpoint = 'sm';

    console.log(`Viewport Width: ${width}px | Active Breakpoint: ${breakpoint}`);
  };

  window.addEventListener('resize', logWidth);
  logWidth();
});
