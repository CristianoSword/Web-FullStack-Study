export function validateOrderPayload(payload, catalog, orderLimit) {
  if (!payload?.customerEmail || !payload.customerEmail.includes("@")) {
    return { valid: false, error: "A valid customerEmail is required." };
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return { valid: false, error: "At least one item is required." };
  }

  if (payload.items.length > orderLimit) {
    return { valid: false, error: `Order exceeds the limit of ${orderLimit} items.` };
  }

  for (const item of payload.items) {
    if (!catalog.find((product) => product.slug === item.slug)) {
      return { valid: false, error: `Unknown product slug '${item.slug}'.` };
    }
  }

  return { valid: true };
}

export function createOrderSummary(payload, catalog, currency) {
  const lineItems = payload.items.map((item) => {
    const product = catalog.find((entry) => entry.slug === item.slug);
    const quantity = Number(item.quantity || 1);
    return {
      slug: product.slug,
      title: product.title,
      quantity,
      unitPrice: product.price,
      lineTotal: product.price * quantity
    };
  });

  const total = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

  return {
    id: `order-${lineItems.length}-${total}`,
    customerEmail: payload.customerEmail,
    currency,
    total,
    lineItems
  };
}
