export class ArtifactTransferModel {
  constructor({ artifactName, artifactPath, producerJob, consumerJob }) {
    this.artifactName = artifactName;
    this.artifactPath = artifactPath;
    this.producerJob = producerJob;
    this.consumerJob = consumerJob;
  }
}
