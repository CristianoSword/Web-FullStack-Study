import { ObjectEntryModel } from "../models/object-entry.model.js";

export class ObjectManifestService {
  constructor({ settings, manifest }) {
    this.settings = settings;
    this.manifest = manifest.map((entry) => new ObjectEntryModel(entry));
  }

  buildSummary() {
    return {
      totalObjects: this.manifest.length,
      publicObjects: this.manifest.filter((entry) => entry.key.startsWith("public/")).length,
      privateObjects: this.manifest.filter((entry) => !entry.key.startsWith("public/")).length,
      uploadCommands: this.manifest.map(
        (entry) =>
          `aws --endpoint-url ${this.settings.endpoint} s3 cp <local-file> s3://${this.settings.bucketName}/${entry.key} --content-type ${entry.contentType}`
      )
    };
  }
}
