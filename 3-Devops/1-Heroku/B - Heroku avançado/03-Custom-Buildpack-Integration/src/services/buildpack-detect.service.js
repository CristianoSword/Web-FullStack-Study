import { createBuildpackDetectReport } from "../models/buildpack-detect.model.js";

export class BuildpackDetectService {
  constructor({ config, sampleAppFiles }) {
    this.config = config;
    this.sampleAppFiles = sampleAppFiles;
  }

  buildReport() {
    const detected = this.sampleAppFiles.includes(this.config.detectFile);

    return createBuildpackDetectReport({
      buildpackLabel: this.config.buildpackLabel,
      detectFile: this.config.detectFile,
      sampleAppPath: "sample-app",
      detected
    });
  }
}
