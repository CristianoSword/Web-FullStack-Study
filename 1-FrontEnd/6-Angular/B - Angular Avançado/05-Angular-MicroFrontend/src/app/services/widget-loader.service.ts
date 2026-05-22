import { Injectable, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FinanceWidgetComponent } from '../widgets/finance-widget.component';
import { LogsWidgetComponent } from '../widgets/logs-widget.component';
import { AnalyticsWidgetComponent } from '../widgets/analytics-widget.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetLoaderService {
  private widgetRegistry: Record<string, Type<any>> = {
    'finance': FinanceWidgetComponent,
    'logs': LogsWidgetComponent,
    'analytics': AnalyticsWidgetComponent
  };

  loadWidgetComponent(widgetId: string): Observable<Type<any>> {
    const comp = this.widgetRegistry[widgetId];
    if (!comp) {
      throw new Error(`Widget com id "${widgetId}" não registrado.`);
    }

    // Emulate network latency of downloading remote micro-frontend module chunk
    return of(comp).pipe(
      delay(1500)
    );
  }
}
