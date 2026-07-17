import { MerkleService } from "./services/merkle-service.js";

const merkleService = new MerkleService();

function printHelp() {
  console.log(`
Merkle Tree Builder CLI

Usage:
  node src/index.js demo
  node src/index.js root --values "tx1,tx2,tx3,tx4"
  node src/index.js proof --values "tx1,tx2,tx3,tx4" --leaf "tx3"
  node src/index.js verify --proof '<json>' --json

Options:
  --values   Comma-separated leaf values
  --leaf     Target value to prove
  --proof    JSON proof payload
  --json     Prints raw JSON
  --help     Show this message
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

function parseValues(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function output(data, asJson = false) {
  if (asJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(data);
}

function runDemo() {
  const values = ["tx-1", "tx-2", "tx-3", "tx-4", "tx-5"];
  const tree = merkleService.buildTree(values);
  const proof = merkleService.createProof(values, "tx-3");

  return {
    values,
    root: tree.root?.hash ?? null,
    proof,
    verified: merkleService.verifyProof(proof)
  };
}

function run() {
  const [, , command, ...argv] = process.argv;
  const args = parseArgs(argv);
  const asJson = Boolean(args.json);

  if (!command || args.help) {
    printHelp();
    return;
  }

  if (command === "demo") {
    output(runDemo(), asJson);
    return;
  }

  if (command === "root") {
    const values = parseValues(args.values);
    output(
      {
        values,
        root: merkleService.getRoot(values)
      },
      asJson
    );
    return;
  }

  if (command === "proof") {
    const values = parseValues(args.values);
    output(merkleService.createProof(values, args.leaf), asJson);
    return;
  }

  if (command === "verify") {
    const proof = JSON.parse(args.proof ?? "{}");
    output({ verified: merkleService.verifyProof(proof) }, asJson);
    return;
  }

  throw new Error(`Unknown command "${command}".`);
}

try {
  run();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
