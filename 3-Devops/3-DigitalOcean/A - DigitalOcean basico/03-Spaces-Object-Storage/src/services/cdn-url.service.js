import { CdnAssetModel } from "../models/cdn-asset.model.js";

export class CdnUrlService {
  constructor({ settings, manifest }) {
    this.settings = settings;
    this.manifest = manifest;
  }

  buildAssets() {
    return this.manifest
      .filter((entry) => entry.key.startsWith("public/"))
      .map(
        (entry) =>
          new CdnAssetModel({
            key: entry.key,
            publicUrl: `https://${this.settings.cdnDomain}/${entry.key}`,
            cacheControl: entry.cacheControl
          })
      );
  }
}
