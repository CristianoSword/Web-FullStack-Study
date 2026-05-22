import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuraBadgeVariant } from '../models/library.types';

@Component({
  selector: 'aura-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="['aura-badge', 'badge-' + variant]">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .aura-badge {
      display: inline-flex;
      align-items: center;
      font-size: 10px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1px solid transparent;
    }

    .badge-success {
      background-color: hsla(150, 100%, 55%, 0.12);
      color: #2ad17a;
      border-color: rgba(42, 209, 122, 0.2);
    }

    .badge-warning {
      background-color: hsla(45, 100%, 50%, 0.12);
      color: #ffc83b;
      border-color: rgba(255, 200, 59, 0.2);
    }

    .badge-info {
      background-color: hsla(190, 100%, 50%, 0.12);
      color: #00e5ff;
      border-color: rgba(0, 229, 255, 0.2);
    }

    .badge-danger {
      background-color: hsla(0, 100%, 60%, 0.12);
      color: #ff4a4a;
      border-color: rgba(255, 74, 74, 0.2);
    }
  `]
})
export class AuraBadgeComponent {
  @Input() variant: AuraBadgeVariant = 'success';
}
