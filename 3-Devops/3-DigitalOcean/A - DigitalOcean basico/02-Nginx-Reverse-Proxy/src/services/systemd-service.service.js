import { ServiceUnitModel } from "../models/service-unit.model.js";

export class SystemdServiceService {
  constructor({ settings }) {
    this.settings = settings;
  }

  buildPlan() {
    return new ServiceUnitModel({
      name: "study-app.service",
      workingDirectory: "/opt/study-app",
      user: "www-data",
      port: this.settings.appPort
    });
  }

  buildCommands() {
    return [
      "sudo cp systemd/study-app.service /etc/systemd/system/study-app.service",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable --now study-app",
      "sudo systemctl status study-app --no-pager"
    ];
  }
}
