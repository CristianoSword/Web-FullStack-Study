export class BuildpackReleaseService {
  constructor({ config }) {
    this.config = config;
  }

  buildReleaseSummary() {
    return {
      exportedVariables: ["WASMTOY_HOME"],
      defaultProcessType: "web: node src/index.js",
      compileSteps: [
        "Detect toolchain.toml in the app root.",
        "Install the wasmtoy binary into vendor/wasmtoy/bin.",
        "Expose PATH and WASMTOY_HOME through .profile.d."
      ]
    };
  }
}
