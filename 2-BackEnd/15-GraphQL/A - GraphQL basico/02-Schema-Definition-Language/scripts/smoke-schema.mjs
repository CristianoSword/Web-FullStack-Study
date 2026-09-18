import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4101/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for server
    }

    await delay(300);
  }

  throw new Error("Server did not start in time.");
}

try {
  await waitForServer();

  const response = await fetch("http://localhost:4101/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: "query UsersAndPosts { users { id name posts { id title } } }"
    })
  });

  const body = await response.json();
  const users = body?.data?.users;

  if (!Array.isArray(users) || users.length !== 2) {
    throw new Error("Unexpected users payload.");
  }

  if (!Array.isArray(users[0].posts)) {
    throw new Error("Nested posts field was not resolved.");
  }

  console.log("GraphQL SDL smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
