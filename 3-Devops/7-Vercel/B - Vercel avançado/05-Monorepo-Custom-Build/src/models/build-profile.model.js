export class BuildProfile {
  constructor({ installCommand, buildCommand, ignoreCommand, outputDirectory }) {
    this.installCommand = installCommand;
    this.buildCommand = buildCommand;
    this.ignoreCommand = ignoreCommand;
    this.outputDirectory = outputDirectory;
  }

  static from(raw) {
    return new BuildProfile(raw);
  }
}
