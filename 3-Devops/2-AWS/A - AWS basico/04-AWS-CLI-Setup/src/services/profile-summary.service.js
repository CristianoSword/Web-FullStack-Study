import { createProfileSummary } from "../models/profile-summary.model.js";

export class ProfileSummaryService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildSummary() {
    const profileName = this.env.AWS_PROFILE ?? this.config.profileName;
    const region = this.env.AWS_DEFAULT_REGION ?? this.config.defaultRegion;

    return createProfileSummary({
      profileName,
      region,
      outputFormat: this.config.outputFormat,
      configTemplatePath: "templates/config.ini",
      credentialsTemplatePath: "templates/credentials.ini"
    });
  }
}
