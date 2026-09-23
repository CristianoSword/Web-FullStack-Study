import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4202/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for startup
    }

    await delay(300);
  }

  throw new Error("Optimizer GraphQL server did not start in time.");
}

try {
  await waitForServer();

  const response = await fetch("http://localhost:4202/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: "query PostsWithStats { posts(limit: 4) { id title author { id name } metric { postId views likes } } sqlStats { executedQueries recentStatements } }"
    })
  });

  const body = await response.json();
  const posts = body?.data?.posts;
  const sqlStats = body?.data?.sqlStats;

  if (!Array.isArray(posts) || posts.length !== 4) {
    throw new Error("Unexpected posts payload.");
  }

  if (!posts.every((post) => post.author?.id && post.metric?.postId)) {
    throw new Error("Nested author or metric resolvers failed.");
  }

  if (!sqlStats || sqlStats.executedQueries > 3) {
    throw new Error("Expected batched SQL execution with at most 3 queries.");
  }

  console.log("DataLoader database optimizer smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
