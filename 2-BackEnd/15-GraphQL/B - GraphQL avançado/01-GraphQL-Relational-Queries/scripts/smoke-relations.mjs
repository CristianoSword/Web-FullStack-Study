import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4201/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for startup
    }

    await delay(300);
  }

  throw new Error("Relational GraphQL server did not start in time.");
}

try {
  await waitForServer();

  const response = await fetch("http://localhost:4201/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: "query PostsByTeam { postsByTeam(team: \"platform\") { id title author { id name } comments { id authorName } } }"
    })
  });

  const body = await response.json();
  const posts = body?.data?.postsByTeam;

  if (!Array.isArray(posts) || posts.length !== 3) {
    throw new Error("Unexpected postsByTeam payload.");
  }

  if (!posts.every((post) => post.author?.id && Array.isArray(post.comments))) {
    throw new Error("Deep relational fields were not resolved.");
  }

  console.log("GraphQL relational queries smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
