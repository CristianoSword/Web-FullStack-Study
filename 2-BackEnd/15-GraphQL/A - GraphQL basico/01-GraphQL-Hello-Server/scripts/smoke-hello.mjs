import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4100/health");
      if (response.ok) {
        return;
      }
    } catch {
      // keep polling until the server is ready
    }

    await delay(300);
  }

  throw new Error("Server did not start in time.");
}

try {
  await waitForServer();

  const health = await fetch("http://localhost:4100/health");
  const healthJson = await health.json();

  if (healthJson.status !== "ok") {
    throw new Error("Unexpected health response.");
  }

  const graphqlResponse = await fetch("http://localhost:4100/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: "query HelloQuery { hello(name: \"Codex\") { message source } }"
    })
  });

  const graphqlJson = await graphqlResponse.json();
  const greeting = graphqlJson?.data?.hello;

  if (!greeting || greeting.message !== "Hello, Codex!" || greeting.source !== "graphql-hello-server") {
    throw new Error("Unexpected GraphQL hello response.");
  }

  console.log("GraphQL hello server smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
