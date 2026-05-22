import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 40px; text-align: center;">
      <h1>📊 AuraAnalytics Dashboard Setup</h1>
      <p>Pronto para receber gráficos reativos e lazy-loading corporativo.</p>
    </div>
  `
})
export class DashboardComponent {}
