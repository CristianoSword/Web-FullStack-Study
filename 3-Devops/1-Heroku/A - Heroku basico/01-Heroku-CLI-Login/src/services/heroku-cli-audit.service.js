import { createCliAuditReport } from "../models/cli-audit.model.js";
import { runCommand } from "../utils/command-runner.js";

export class HerokuCliAuditService {
  constructor({ config, env = process.env, commandRunner = runCommand }) {
    this.config = config;
    this.env = env;
    this.commandRunner = commandRunner;
  }

  buildAuditReport() {
    const versionResult = this.commandRunner("heroku", ["--version"]);
    const whoamiResult = versionResult.success
      ? this.commandRunner("heroku", ["auth:whoami"])
      : { success: false, stdout: "", stderr: "Heroku CLI not available." };

    const warnings = [];

    if (!versionResult.success) {
      warnings.push("Heroku CLI was not found in PATH.");
    }

    if (!this.env.HEROKU_EMAIL) {
      warnings.push("HEROKU_EMAIL is not configured.");
    }

    if (!this.env.HEROKU_API_KEY) {
      warnings.push("HEROKU_API_KEY is not configured.");
    }

    const authState = this.#resolveAuthState(versionResult.success, whoamiResult);

    return createCliAuditReport({
      serviceName: this.config.serviceName,
      cliInstalled: versionResult.success,
      cliVersion: versionResult.success ? versionResult.stdout.trim() : null,
      emailConfigured: Boolean(this.env.HEROKU_EMAIL),
      apiKeyConfigured: Boolean(this.env.HEROKU_API_KEY),
      authState,
      warnings,
      verificationCommands: this.config.verificationCommands
    });
  }

  #resolveAuthState(cliInstalled, whoamiResult) {
    if (!cliInstalled) {
      return "cli-missing";
    }

    if (whoamiResult.success && whoamiResult.stdout.trim()) {
      return "logged-in";
    }

    return "login-required";
  }
}
