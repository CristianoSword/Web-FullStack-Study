export class IncidentBriefService {
  constructor({ parsedEntries }) {
    this.parsedEntries = parsedEntries;
  }

  buildBrief() {
    const workerEntries = this.parsedEntries.filter((entry) => entry.dyno?.startsWith("worker"));
    const routerEntries = this.parsedEntries.filter((entry) => entry.channel === "heroku");

    return {
      totalEntries: this.parsedEntries.length,
      workerEntries: workerEntries.length,
      routerEntries: routerEntries.length,
      recommendation:
        "Start with heroku logs --tail, then narrow by --source or --dyno once the noisy stream is understood."
    };
  }
}
