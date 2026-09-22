import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4104/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for startup
    }

    await delay(300);
  }

  throw new Error("Apollo server did not start in time.");
}

try {
  await waitForServer();

  const response = await fetch("http://localhost:4104/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: "query ServicesQuery { services { id name status } }"
    })
  });

  const body = await response.json();
  const services = body?.data?.services;

  if (!Array.isArray(services) || services.length !== 3) {
    throw new Error("Unexpected services payload.");
  }

  if (!services.some((service) => service.name === "Billing API")) {
    throw new Error("Apollo query did not return expected service.");
  }

  console.log("Apollo Server smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
