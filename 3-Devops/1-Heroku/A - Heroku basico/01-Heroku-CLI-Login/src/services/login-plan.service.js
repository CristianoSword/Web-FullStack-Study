import { createCommandPlan } from "../models/command-plan.model.js";

export class LoginPlanService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildPlan() {
    const notes = [...this.config.browserLoginNotes];

    if (this.env.HEROKU_EMAIL) {
      notes.push(`Email preconfigured for account checks: ${this.env.HEROKU_EMAIL}`);
    } else {
      notes.push("Set HEROKU_EMAIL before running audit commands if you want account correlation.");
    }

    if (this.env.HEROKU_API_KEY) {
      notes.push("API key is configured; CLI automation can use authenticated API flows.");
    } else {
      notes.push("Browser or interactive CLI login is still required for first-time authentication.");
    }

    return createCommandPlan({
      primaryLoginCommand: this.config.primaryLoginCommand,
      interactiveFallbackCommand: this.config.interactiveFallbackCommand,
      verificationCommands: this.config.verificationCommands,
      notes
    });
  }
}
