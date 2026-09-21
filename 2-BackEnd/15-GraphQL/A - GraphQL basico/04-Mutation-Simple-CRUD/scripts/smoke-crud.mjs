import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4103/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for startup
    }

    await delay(300);
  }

  throw new Error("Server did not start in time.");
}

async function sendQuery(query) {
  const response = await fetch("http://localhost:4103/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query })
  });

  return response.json();
}

try {
  await waitForServer();

  const created = await sendQuery(`
    mutation {
      createTask(input: { title: "Smoke task", description: "Created by validation" }) {
        id
        title
        status
      }
    }
  `);

  const createdTask = created?.data?.createTask;
  if (!createdTask?.id || createdTask.title !== "Smoke task") {
    throw new Error("Create mutation failed.");
  }

  const updated = await sendQuery(`
    mutation {
      updateTask(id: "${createdTask.id}", input: { status: "done" }) {
        id
        status
      }
    }
  `);

  if (updated?.data?.updateTask?.status !== "done") {
    throw new Error("Update mutation failed.");
  }

  const deleted = await sendQuery(`
    mutation {
      deleteTask(id: "${createdTask.id}")
    }
  `);

  if (deleted?.data?.deleteTask !== true) {
    throw new Error("Delete mutation failed.");
  }

  console.log("GraphQL CRUD smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
