import { ArtifactTransferModel } from "../models/artifact-transfer.model.js";

export class ArtifactSummaryService {
  constructor({ spec }) {
    this.transfer = new ArtifactTransferModel({
      artifactName: spec.artifactName,
      artifactPath: spec.artifactPath,
      producerJob: "build",
      consumerJob: "verify-artifact"
    });
  }

  buildSummary() {
    return this.transfer;
  }
}
