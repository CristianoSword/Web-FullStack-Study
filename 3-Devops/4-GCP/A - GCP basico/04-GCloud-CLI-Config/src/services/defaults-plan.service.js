import { SmokeCommandModel } from "../models/smoke-command.model.js";

export class DefaultsPlanService {
  constructor({ cliProfile, smokeCommands }) {
    this.cliProfile = cliProfile;
    this.smokeCommands = smokeCommands.map((command) => new SmokeCommandModel(command));
  }

  buildPlan() {
    return {
      defaults: {
        project: this.cliProfile.projectId,
        region: this.cliProfile.region,
        zone: this.cliProfile.zone
      },
      smokeCommands: this.smokeCommands,
      operatorAdvice: [
        "Use named configurations to separate work, personal and production contexts.",
        "Keep ADC aligned with the same quota project used by the CLI profile."
      ]
    };
  }
}
