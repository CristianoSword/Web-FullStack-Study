import { P2PNode } from "./services/p2p-node.js";

function printHelp() {
  console.log(`
Simple P2P Sync CLI

Usage:
  node src/index.js demo
  node src/index.js start-node --name "Node A" --port 7001 [--peer "ws://127.0.0.1:7002"]

Options:
  --name   Human-readable peer name
  --port   TCP port for the WebSocket server
  --peer   Optional peer URL to connect after startup
  --json   Prints raw JSON output
  --help   Show this message
`.trim());
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function output(data, asJson = false) {
  if (asJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(data);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runDemo() {
  const ports = [7101, 7102, 7103];
  const nodes = [
    new P2PNode({ name: "Alpha", port: ports[0] }),
    new P2PNode({ name: "Beta", port: ports[1] }),
    new P2PNode({ name: "Gamma", port: ports[2] })
  ];

  try {
    await Promise.all(nodes.map((node) => node.start()));
    await nodes[1].connectToPeer(`ws://127.0.0.1:${ports[0]}`);
    await nodes[2].connectToPeer(`ws://127.0.0.1:${ports[1]}`);
    await sleep(200);

    nodes[0].addLocalBlock({ miner: "Alpha", transactions: ["tx-1", "tx-2"] });
    await sleep(200);
    nodes[1].addLocalBlock({ miner: "Beta", transactions: ["tx-3"] });
    await sleep(400);

    return nodes.map((node) => node.snapshot());
  } finally {
    await Promise.all(nodes.map((node) => node.stop()));
  }
}

async function startSingleNode(args, asJson) {
  const node = new P2PNode({
    name: args.name ?? "Node",
    port: Number(args.port ?? 7001)
  });

  await node.start();

  if (args.peer) {
    await node.connectToPeer(args.peer);
  }

  output(
    {
      message: `Node ${node.peer.name} listening on ws://127.0.0.1:${node.peer.port}`,
      snapshot: node.snapshot()
    },
    asJson
  );
}

async function run() {
  const [, , command, ...argv] = process.argv;
  const args = parseArgs(argv);
  const asJson = Boolean(args.json);

  if (!command || args.help) {
    printHelp();
    return;
  }

  if (command === "demo") {
    output(await runDemo(), asJson);
    return;
  }

  if (command === "start-node") {
    if (!args.port) {
      throw new Error("Use --port to start a node server.");
    }
    await startSingleNode(args, asJson);
    return;
  }

  throw new Error(`Unknown command "${command}".`);
}

run().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
