import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4204/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for startup
    }

    await delay(300);
  }

  throw new Error("Custom directives auth server did not start in time.");
}

async function sendQuery(query, token) {
  const headers = { "content-type": "application/json" };
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const response = await fetch("http://localhost:4204/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query })
  });

  return response.json();
}

try {
  await waitForServer();

  const publicFeed = await sendQuery("query { publicFeed }");
  if (!Array.isArray(publicFeed?.data?.publicFeed) || publicFeed.data.publicFeed.length < 1) {
    throw new Error("Public feed query failed.");
  }

  const unauthenticated = await sendQuery("query { me { id name } }");
  if (unauthenticated?.errors?.[0]?.extensions?.code !== "UNAUTHENTICATED") {
    throw new Error("Expected UNAUTHENTICATED for me query without token.");
  }

  const forbidden = await sendQuery("query { adminReports { id } }", "token-billing-ops");
  if (forbidden?.errors?.[0]?.extensions?.code !== "FORBIDDEN") {
    throw new Error("Expected FORBIDDEN for adminReports with non-admin token.");
  }

  const admin = await sendQuery("query { adminReports { id title } }", "token-admin-root");
  if (!Array.isArray(admin?.data?.adminReports) || admin.data.adminReports.length !== 2) {
    throw new Error("Admin token did not access adminReports.");
  }

  const billing = await sendQuery(
    "query { billingSummary { accountId month totalRevenue } }",
    "token-billing-ops"
  );
  if (billing?.data?.billingSummary?.accountId !== "ACC-8801") {
    throw new Error("Billing scoped query failed.");
  }

  console.log("Custom directives auth smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
