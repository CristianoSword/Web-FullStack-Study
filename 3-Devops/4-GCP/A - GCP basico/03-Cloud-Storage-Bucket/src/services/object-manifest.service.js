import { ObjectEntryModel } from "../models/object-entry.model.js";

export class ObjectManifestService {
  constructor({ bucketSpec, manifest }) {
    this.bucketSpec = bucketSpec;
    this.manifest = manifest.map((entry) => new ObjectEntryModel(entry));
  }

  buildSummary() {
    return {
      totalObjects: this.manifest.length,
      publicObjects: this.manifest.filter((entry) => entry.path.startsWith("public/")).length,
      privateObjects: this.manifest.filter((entry) => !entry.path.startsWith("public/")).length,
      uploadCommands: this.manifest.map(
        (entry) =>
          `gcloud storage cp <local-file> gs://${this.bucketSpec.bucketName}/${entry.path}`
      )
    };
  }
}
