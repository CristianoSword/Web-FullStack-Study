import { PublicUrlModel } from "../models/public-url.model.js";

export class PublicUrlService {
  constructor({ bucketSpec, manifest }) {
    this.bucketSpec = bucketSpec;
    this.manifest = manifest;
  }

  buildUrls() {
    return this.manifest
      .filter((entry) => entry.path.startsWith("public/"))
      .map(
        (entry) =>
          new PublicUrlModel({
            path: entry.path,
            url: `https://storage.googleapis.com/${this.bucketSpec.bucketName}/${entry.path}`,
            cacheControl: entry.cacheControl
          })
      );
  }
}
