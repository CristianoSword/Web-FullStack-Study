import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 40px; text-align: center;">
      <h1>📈 AuraAnalytics Reports Setup</h1>
      <p>Pronto para receber a listagem de relatórios e exportadores corporativos.</p>
    </div>
  `
})
export class ReportsComponent {}
