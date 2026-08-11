import init, { apply_filter } from "../pkg/image_filter_wasm.js";
import { presets } from "./presets.js";
import { validateImageFile, validatePreset } from "./validator.js";

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const fileInput = document.querySelector("#image-input");
const buttonsHost = document.querySelector("#buttons");
const statusLabel = document.querySelector("#status");

function drawButtons() {
  buttonsHost.innerHTML = presets
    .map((preset) => `<button data-key="${preset.key}">${preset.label}</button>`)
    .join("");
}

function updateStatus(message) {
  statusLabel.textContent = message;
}

async function loadImage(file) {
  const validationError = validateImageFile(file);

  if (validationError) {
    throw new Error(validationError);
  }

  const image = new Image();
  image.src = URL.createObjectURL(file);
  await image.decode();

  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);
  updateStatus(`Loaded ${file.name} (${image.width}x${image.height})`);
}

function applyPreset(presetKey) {
  const presetError = validatePreset(presetKey, presets);

  if (presetError) {
    throw new Error(presetError);
  }

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const nextPixels = apply_filter(Array.from(imageData.data), presetKey);
  imageData.data.set(nextPixels);
  context.putImageData(imageData, 0, 0);
  updateStatus(`Applied ${presetKey} filter`);
}

drawButtons();

await init();

fileInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;

  if (file) {
    try {
      await loadImage(file);
    } catch (error) {
      updateStatus(error.message);
    }
  }
});

buttonsHost.addEventListener("click", (event) => {
  const key = event.target.dataset.key;

  if (key && canvas.width > 0 && canvas.height > 0) {
    try {
      applyPreset(key);
    } catch (error) {
      updateStatus(error.message);
    }
  }
});
