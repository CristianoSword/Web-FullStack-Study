import { json } from "../lib/response.js";

export default function handler(_request, response) {
  json(response, 200, {
    status: "ok",
    service: "study-store-api",
    runtime: "vercel-serverless"
  });
}
