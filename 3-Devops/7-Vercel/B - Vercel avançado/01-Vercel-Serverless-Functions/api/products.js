import { catalog } from "../lib/catalog.js";
import { badRequest, json, notFound } from "../lib/response.js";

export default function handler(request, response) {
  if (request.method !== "GET") {
    return badRequest(response, "Only GET is supported for /api/products.");
  }

  const slug = request.query?.slug;
  if (!slug) {
    return json(response, 200, {
      items: catalog,
      count: catalog.length
    });
  }

  const product = catalog.find((item) => item.slug === slug);
  if (!product) {
    return notFound(response, `Product '${slug}' was not found.`);
  }

  return json(response, 200, product);
}
