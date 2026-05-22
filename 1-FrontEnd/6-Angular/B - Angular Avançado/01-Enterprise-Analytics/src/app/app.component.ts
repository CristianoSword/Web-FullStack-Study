import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
      background-color: var(--bg-app);
    }
  `]
})
export class AppComponent {
  title = 'AuraAnalytics';
}
