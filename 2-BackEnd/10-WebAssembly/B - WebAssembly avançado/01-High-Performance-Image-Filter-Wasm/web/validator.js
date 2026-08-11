export function validateImageFile(file) {
  if (!file) {
    return "select an image first";
  }

  if (!file.type.startsWith("image/")) {
    return "the selected file is not an image";
  }

  return null;
}

export function validatePreset(presetKey, presets) {
  if (!presets.some((preset) => preset.key === presetKey)) {
    return "unknown preset";
  }

  return null;
}
