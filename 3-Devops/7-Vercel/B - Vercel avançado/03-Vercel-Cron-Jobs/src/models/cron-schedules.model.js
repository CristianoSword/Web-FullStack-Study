export class CronSchedules {
  constructor({ jobs }) {
    this.jobs = jobs;
  }

  static from(raw) {
    return new CronSchedules(raw);
  }
}
