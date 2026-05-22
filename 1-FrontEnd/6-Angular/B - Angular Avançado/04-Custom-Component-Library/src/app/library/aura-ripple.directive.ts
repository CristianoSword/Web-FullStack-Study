import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[auraRipple]',
  standalone: true
})
export class AuraRippleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const target = this.el.nativeElement;
    
    // Create ripple element
    const ripple = this.renderer.createElement('span');
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.addClass(ripple, 'aura-ripple-effect');

    // Make target position relative if needed
    const position = window.getComputedStyle(target).position;
    if (position === 'static') {
      this.renderer.setStyle(target, 'position', 'relative');
    }
    this.renderer.setStyle(target, 'overflow', 'hidden');

    this.renderer.appendChild(target, ripple);

    // Remove ripple after animation ends
    setTimeout(() => {
      this.renderer.removeChild(target, ripple);
    }, 600);
  }
}
