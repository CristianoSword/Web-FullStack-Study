export class ProxyHealthService {
  constructor({ settings }) {
    this.settings = settings;
  }

  buildChecks() {
    return {
      localAppHealth: `curl -I http://127.0.0.1:${this.settings.appPort}/health`,
      nginxHealth: `curl -I http://${this.settings.serverName}/health`,
      headersToInspect: ["Host", "X-Forwarded-For", "X-Forwarded-Proto"],
      expectedResult: "HTTP/1.1 200 OK for both checks before exposing DNS publicly."
    };
  }
}
