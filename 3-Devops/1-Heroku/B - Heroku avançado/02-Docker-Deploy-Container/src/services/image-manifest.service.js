import { createRegistryImage } from "../models/registry-image.model.js";

export class ImageManifestService {
  constructor({ config, env = process.env }) {
    this.config = config;
    this.env = env;
  }

  buildManifest() {
    const appName = this.env.HEROKU_APP_NAME ?? this.config.appName;
    const processType = this.config.processType;
    const imageTag = this.env.IMAGE_TAG ?? this.config.defaultImageTag;

    return createRegistryImage({
      registryHost: this.config.registryHost,
      appName,
      processType,
      imageName: `${this.config.registryHost}/${appName}/${processType}`,
      imageTag
    });
  }
}
