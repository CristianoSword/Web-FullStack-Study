import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4205/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for startup
    }

    await delay(500);
  }

  throw new Error("Federated supergraph did not start in time.");
}

try {
  await waitForServer();

  const response = await fetch("http://localhost:4205/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
        query ProductsWithSellerAndReviews {
          products {
            id
            title
            seller {
              id
              name
            }
            reviews {
              id
              rating
              author {
                id
                name
              }
            }
          }
        }
      `
    })
  });

  const body = await response.json();
  const products = body?.data?.products;

  if (!Array.isArray(products) || products.length !== 2) {
    throw new Error("Unexpected products payload from federated gateway.");
  }

  if (!products.every((product) => product.seller?.id && Array.isArray(product.reviews))) {
    throw new Error("Federated entity resolution failed.");
  }

  console.log("Federated supergraph smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
