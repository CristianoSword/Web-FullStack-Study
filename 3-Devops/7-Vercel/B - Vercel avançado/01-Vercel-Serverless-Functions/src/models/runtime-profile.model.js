export class RuntimeProfile {
  constructor({ runtime, memory, maxDuration, sharedModules }) {
    this.runtime = runtime;
    this.memory = memory;
    this.maxDuration = maxDuration;
    this.sharedModules = sharedModules;
  }

  static from(raw) {
    return new RuntimeProfile(raw);
  }
}
