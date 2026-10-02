export function validateCreateOrderCommand(command) {
  const errors = [];

  if (!command || typeof command !== "object") {
    return ["Payload must be an object."];
  }

  if (typeof command.customerId !== "string" || command.customerId.trim().length === 0) {
    errors.push("customerId is required.");
  }

  if (!Array.isArray(command.items) || command.items.length === 0) {
    errors.push("items must contain at least one item.");
    return errors;
  }

  command.items.forEach((item, index) => {
    if (typeof item.sku !== "string" || item.sku.trim().length === 0) {
      errors.push(`items[${index}].sku is required.`);
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      errors.push(`items[${index}].quantity must be a positive integer.`);
    }

    if (typeof item.unitPrice !== "number" || Number.isNaN(item.unitPrice) || item.unitPrice <= 0) {
      errors.push(`items[${index}].unitPrice must be a positive number.`);
    }
  });

  return errors;
}

export function normalizeCreateOrderCommand(command) {
  return {
    customerId: command.customerId.trim(),
    items: command.items.map((item) => ({
      sku: item.sku.trim(),
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice)
    }))
  };
}
