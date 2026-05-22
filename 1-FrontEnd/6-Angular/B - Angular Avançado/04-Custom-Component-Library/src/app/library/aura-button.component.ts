import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuraButtonVariant } from '../models/library.types';
import { AuraRippleDirective } from './aura-ripple.directive';

@Component({
  selector: 'aura-button',
  standalone: true,
  imports: [CommonModule, AuraRippleDirective],
  template: `
    <button 
      [class]="['aura-btn', 'variant-' + variant]"
      [disabled]="disabled"
      (click)="onClick($event)"
      auraRipple
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .aura-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 700;
      padding: 12px 24px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      outline: none;
      border: 1px solid transparent;
      transition: all 0.25s;
    }

    .variant-primary {
      background: linear-gradient(135deg, hsl(var(--primary)), #b549f0);
      color: var(--text-primary);
      box-shadow: 0 4px 15px hsla(var(--primary), 0.3);
    }

    .variant-primary:hover {
      box-shadow: 0 6px 20px hsla(var(--primary), 0.45);
    }

    .variant-secondary {
      background-color: var(--bg-surface-hover);
      border-color: var(--border);
      color: var(--text-primary);
    }

    .variant-secondary:hover {
      background-color: var(--border);
    }

    .variant-outline {
      background: transparent;
      border-color: hsl(var(--primary));
      color: hsl(var(--primary));
    }

    .variant-outline:hover {
      background-color: var(--primary-glow);
    }

    .variant-danger {
      background-color: #ff4a4a;
      color: white;
      box-shadow: 0 4px 15px rgba(255, 74, 74, 0.3);
    }

    .variant-danger:hover {
      background-color: #f03e3e;
    }

    .aura-btn:disabled {
      background: var(--border);
      color: var(--text-muted);
      cursor: not-allowed;
      box-shadow: none;
      border-color: transparent;
    }
  `]
})
export class AuraButtonComponent {
  @Input() variant: AuraButtonVariant = 'primary';
  @Input() disabled = false;
  @Output() auraClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.auraClick.emit(event);
    }
  }
}
