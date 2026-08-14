export function validateHexBlock(value, fieldName) {
  if (!/^[0-9a-fA-F]{32}$/.test(value)) {
    throw new Error(`${fieldName} must be a 16-byte hex string`);
  }
}

export function validateMessage(value, fieldName) {
  if (!value || value.trim() === "") {
    throw new Error(`${fieldName} cannot be empty`);
  }
}
