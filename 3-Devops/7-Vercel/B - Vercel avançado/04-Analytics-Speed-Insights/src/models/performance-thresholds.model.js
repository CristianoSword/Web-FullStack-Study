export class PerformanceThresholds {
  constructor({ thresholds }) {
    this.thresholds = thresholds;
  }

  static from(raw) {
    return new PerformanceThresholds(raw);
  }
}
