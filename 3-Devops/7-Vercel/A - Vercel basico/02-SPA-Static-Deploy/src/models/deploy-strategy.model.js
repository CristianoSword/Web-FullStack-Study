export class DeployStrategy {
  constructor({ outputDirectory, previewCommand, productionCommand, routingMode }) {
    this.outputDirectory = outputDirectory;
    this.previewCommand = previewCommand;
    this.productionCommand = productionCommand;
    this.routingMode = routingMode;
  }

  static from(raw) {
    return new DeployStrategy(raw);
  }
}
