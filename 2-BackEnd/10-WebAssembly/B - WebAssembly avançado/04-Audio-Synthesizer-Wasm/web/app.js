import init, { generate_tone } from "../pkg/audio_synthesizer_wasm.js";
import { presets } from "./presets.js";
import { validateSynthConfig } from "./validator.js";

const presetSelect = document.querySelector("#preset");
const frequencyField = document.querySelector("#frequency");
const durationField = document.querySelector("#duration");
const gainField = document.querySelector("#gain");
const statusLabel = document.querySelector("#status");

let audioContext;

function fillPresetOptions() {
  presetSelect.innerHTML = presets
    .map((preset, index) => `<option value="${index}">${preset.label}</option>`)
    .join("");
}

function applyPreset(index) {
  const preset = presets[index];
  frequencyField.value = preset.frequency;
  durationField.value = preset.duration;
  gainField.value = preset.gain;
}

async function playCurrentConfig() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  const config = {
    frequency: Number(frequencyField.value),
    duration: Number(durationField.value),
    gain: Number(gainField.value),
    sampleRate: audioContext.sampleRate
  };

  validateSynthConfig(config);

  const samples = generate_tone(config);
  const buffer = audioContext.createBuffer(1, samples.length, config.sampleRate);
  buffer.copyToChannel(Float32Array.from(samples), 0);

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();

  statusLabel.textContent = `Playing ${samples.length} PCM samples at ${config.frequency}Hz.`;
}

await init();
fillPresetOptions();
applyPreset(0);

presetSelect.addEventListener("change", () => {
  applyPreset(Number(presetSelect.value));
});

document.querySelector("#play").addEventListener("click", () => {
  try {
    playCurrentConfig();
  } catch (error) {
    statusLabel.textContent = error.message;
  }
});
