export class ReleaseChecklistService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildChecklist() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;

    return {
      appName,
      verificationCommands: this.config.verificationCommands,
      checklist: [
        "Authenticate to Heroku Container Registry.",
        "Build the web image from the repository Dockerfile.",
        "Push the image with heroku container:push web.",
        "Release the pushed image to the web dyno.",
        "Verify /health and inspect runtime logs after boot."
      ]
    };
  }
}
