export function validateInputs(inputs) {
  if (!Array.isArray(inputs) || inputs.length === 0) {
    throw new Error("At least one input batch is required.");
  }

  inputs.forEach((input) => {
    if (!input.label || !Array.isArray(input.values) || input.values.length === 0) {
      throw new Error(`Invalid input batch: ${JSON.stringify(input)}`);
    }
  });
}
