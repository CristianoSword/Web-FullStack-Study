import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

import { createClient } from "graphql-ws";
import WebSocket from "ws";

const server = spawn("node", ["src/server.js"], {
  cwd: process.cwd(),
  stdio: "pipe"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4203/health");
      if (response.ok) {
        return;
      }
    } catch {
      // wait for startup
    }

    await delay(300);
  }

  throw new Error("Subscription server did not start in time.");
}

async function publishScore() {
  const response = await fetch("http://localhost:4203/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation PublishScore {
          publishScore(
            input: {
              matchId: "MTC-1001"
              homeTeam: "OpenAI FC"
              awayTeam: "Codex United"
              homeScore: 3
              awayScore: 1
              minute: 82
            }
          ) {
            matchId
            homeScore
            awayScore
            minute
          }
        }
      `
    })
  });

  return response.json();
}

try {
  await waitForServer();

  const client = createClient({
    url: "ws://localhost:4203/graphql",
    webSocketImpl: WebSocket
  });

  const payloadPromise = new Promise((resolve, reject) => {
    let settled = false;

    const dispose = client.subscribe(
      {
        query: `
          subscription ScoreUpdated {
            scoreUpdated(matchId: "MTC-1001") {
              matchId
              homeScore
              awayScore
              minute
            }
          }
        `
      },
      {
        next: (value) => {
          if (!settled) {
            settled = true;
            resolve({ value, dispose });
          }
        },
        error: (error) => {
          if (!settled) {
            settled = true;
            reject(error);
          }
        },
        complete: () => {
          if (!settled) {
            settled = true;
            reject(new Error("Subscription completed before receiving an event."));
          }
        }
      }
    );

    setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error("Timed out waiting for subscription event."));
      }
    }, 5000);
  });

  await delay(250);
  await publishScore();

  const payload = await payloadPromise;

  const event = payload.value?.data?.scoreUpdated;

  if (!event || event.homeScore !== 3 || event.minute !== 82) {
    throw new Error("Unexpected websocket subscription payload.");
  }

  payload.dispose();
  console.log("GraphQL websocket subscription smoke test passed.");
} finally {
  server.kill("SIGTERM");
}
