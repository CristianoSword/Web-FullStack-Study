import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aura-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="['aura-card', hoverable ? 'hoverable' : '', clickable ? 'clickable' : '']"
      (click)="onClick($event)"
    >
      @if (title || subtitle) {
        <div class="card-header">
          @if (title) {
            <h3 class="card-title">{{ title }}</h3>
          }
          @if (subtitle) {
            <p class="card-subtitle">{{ subtitle }}</p>
          }
        </div>
      }
      
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .aura-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
      box-shadow: var(--shadow-sm);
      transition: all 0.25s;
    }

    .card-header {
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      padding-bottom: 16px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-primary);
    }

    .card-subtitle {
      font-size: 12px;
      color: var(--text-secondary);
      margin-top: 4px;
    }

    .aura-card.hoverable:hover {
      transform: translateY(-2px);
      border-color: var(--border-focus);
      box-shadow: var(--shadow-md);
    }

    .aura-card.clickable {
      cursor: pointer;
    }

    .aura-card.clickable:active {
      transform: scale(0.985);
    }
  `]
})
export class AuraCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() hoverable = false;
  @Input() clickable = false;
  @Output() auraClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (this.clickable) {
      this.auraClick.emit(event);
    }
  }
}
