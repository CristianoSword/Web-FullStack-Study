import { createDeployProfile } from "../models/deploy-profile.model.js";
import { createRouteMap } from "../models/route-map.model.js";

export class DeployReadinessService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildProfile() {
    return createDeployProfile({
      appName: this.env.APP_NAME ?? this.config.appName,
      port: Number.parseInt(this.env.PORT ?? String(this.config.defaultPort), 10),
      appEnv: this.env.APP_ENV ?? "development",
      releaseChecklist: this.config.herokuReleaseChecklist
    });
  }

  buildRouteMap() {
    return createRouteMap(this.config.verificationRoutes);
  }
}
