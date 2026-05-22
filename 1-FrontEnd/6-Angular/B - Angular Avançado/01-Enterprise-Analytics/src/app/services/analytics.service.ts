import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetricItem, ReportItem } from '../models/analytics.models';
import { MOCK_METRICS, MOCK_REPORTS } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private metricsSub = new BehaviorSubject<MetricItem[]>([...MOCK_METRICS]);
  private reportsSub = new BehaviorSubject<ReportItem[]>([...MOCK_REPORTS]);

  metrics$: Observable<MetricItem[]> = this.metricsSub.asObservable();
  reports$: Observable<ReportItem[]> = this.reportsSub.asObservable();

  constructor() {
    // Periodically fluctuate metric values slightly to showcase absolute real-time re-rendering
    setInterval(() => {
      this.fluctuateMetrics();
    }, 4000);
  }

  private fluctuateMetrics() {
    const current = this.metricsSub.value.map(metric => {
      let val = typeof metric.value === 'number' ? metric.value : parseFloat(metric.value);
      const isPositiveFluctuation = Math.random() > 0.4;
      const amount = val * (Math.random() * 0.015); // max 1.5% fluctuation
      
      const newValue = isPositiveFluctuation ? val + amount : val - amount;
      
      // Update history values
      const lastHist = metric.history[metric.history.length - 1];
      const newHistory = [...metric.history.slice(1), lastHist + (isPositiveFluctuation ? 1 : -1) * (Math.random() * 3)];

      return {
        ...metric,
        value: parseFloat(newValue.toFixed(2)),
        trendPercent: parseFloat((Math.random() * 15).toFixed(1)),
        isPositive: isPositiveFluctuation,
        history: newHistory
      };
    });
    this.metricsSub.next(current);
  }

  addReport(report: Omit<ReportItem, 'id' | 'date'>) {
    const newReport: ReportItem = {
      ...report,
      id: `rep-${Math.floor(100 + Math.random() * 900)}`,
      date: '22 Mai, 2026'
    };
    this.reportsSub.next([newReport, ...this.reportsSub.value]);
  }

  deleteReport(id: string) {
    this.reportsSub.next(this.reportsSub.value.filter(r => r.id !== id));
  }
}
