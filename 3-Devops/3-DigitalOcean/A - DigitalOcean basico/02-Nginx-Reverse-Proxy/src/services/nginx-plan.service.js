import { ProxyRouteModel } from "../models/proxy-route.model.js";
import { UpstreamTargetModel } from "../models/upstream-target.model.js";

export class NginxPlanService {
  constructor({ settings, upstream }) {
    this.settings = settings;
    this.upstream = upstream;
  }

  buildPlan() {
    return {
      serverName: this.settings.serverName,
      listenPort: this.settings.listenPort,
      upstreamName: this.upstream.name,
      targets: this.upstream.targets.map((target) => new UpstreamTargetModel(target)),
      routes: [
        new ProxyRouteModel({ path: "/", upstream: this.upstream.name }),
        new ProxyRouteModel({ path: "/health", upstream: this.upstream.name, healthCheck: true })
      ],
      deploySteps: [
        "Copy site config to /etc/nginx/sites-available",
        "Enable the site symlink",
        "Validate nginx syntax",
        "Reload nginx after local app is healthy"
      ]
    };
  }
}
