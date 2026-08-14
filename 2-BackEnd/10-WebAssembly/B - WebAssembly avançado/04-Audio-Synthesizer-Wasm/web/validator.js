export function validateSynthConfig(config) {
  if (config.frequency <= 0 || config.duration <= 0 || config.sampleRate <= 0) {
    throw new Error("frequency, duration and sample rate must be positive");
  }

  if (config.gain <= 0 || config.gain > 1) {
    throw new Error("gain must stay between 0 and 1");
  }
}
