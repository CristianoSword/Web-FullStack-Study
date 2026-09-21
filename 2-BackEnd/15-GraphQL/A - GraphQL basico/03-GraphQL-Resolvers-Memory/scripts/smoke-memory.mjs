import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4102/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for server bootstrap
    }

    await delay(300);
  }

  throw new Error("Server did not start in time.");
}

try {
  await waitForServer();

  const response = await fetch("http://localhost:4102/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: "query FilteredPosts { posts(authorId: \"USR-102\", published: true) { id title author { id name } } }"
    })
  });

  const body = await response.json();
  const posts = body?.data?.posts;

  if (!Array.isArray(posts) || posts.length !== 1) {
    throw new Error("Unexpected filtered posts response.");
  }

  if (posts[0].author?.id !== "USR-102") {
    throw new Error("Nested author resolver did not match.");
  }

  console.log("GraphQL memory resolvers smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
