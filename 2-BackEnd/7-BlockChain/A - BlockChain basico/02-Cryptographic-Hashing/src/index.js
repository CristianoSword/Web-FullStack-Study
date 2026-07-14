import { HashService } from "./services/hash-service.js";

const hashService = new HashService();

function printHelp() {
  console.log(`
Cryptographic Hashing CLI

Usage:
  node src/index.js hash --text "hello" [--salt "study"] [--algo sha256]
  node src/index.js verify --text "hello" --digest "<hex>" [--salt "study"] [--algo sha256]
  node src/index.js compare --left "hello" --right "world" [--salt "study"] [--algo sha256]

Options:
  --text    Text payload for hash/verify
  --digest  Hex digest to validate
  --salt    Optional salt prefix
  --algo    sha256 | sha384 | sha512
  --left    Left payload for compare
  --right   Right payload for compare
  --json    Prints raw JSON output
  --help    Show this message
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

function output(result, asJson = false) {
  if (asJson) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(result);
}

function run() {
  const [, , command, ...argv] = process.argv;
  const args = parseArgs(argv);
  const algorithm = args.algo ?? "sha256";
  const salt = args.salt ?? "";
  const asJson = Boolean(args.json);

  if (!command || args.help) {
    printHelp();
    return;
  }

  if (command === "hash") {
    const result = hashService.hashText({
      payload: args.text,
      salt,
      algorithm
    });

    output(result, asJson);
    return;
  }

  if (command === "verify") {
    const isValid = hashService.verify({
      payload: args.text,
      salt,
      digest: args.digest,
      algorithm
    });

    output(
      {
        algorithm,
        payload: args.text,
        salt,
        digest: args.digest,
        verified: isValid
      },
      asJson
    );
    process.exitCode = isValid ? 0 : 1;
    return;
  }

  if (command === "compare") {
    const result = hashService.compareHashes(
      {
        payload: args.left,
        salt,
        algorithm
      },
      {
        payload: args.right,
        salt,
        algorithm
      }
    );

    output(result, asJson);
    return;
  }

  throw new Error(`Unknown command "${command}". Use --help to see available commands.`);
}

try {
  run();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
