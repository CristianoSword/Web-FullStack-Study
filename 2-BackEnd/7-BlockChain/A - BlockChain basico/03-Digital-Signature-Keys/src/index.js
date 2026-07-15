import { SignatureService } from "./services/signature-service.js";

const signatureService = new SignatureService();

function printHelp() {
  console.log(`
Digital Signature Keys CLI

Usage:
  node src/index.js demo
  node src/index.js generate-wallet --owner "Alice"
  node src/index.js sign-transaction --from-owner "Alice" --to-owner "Bob" --amount 25 --fee 1 --memo "Invoice"
  node src/index.js verify-transaction --payload '<signed-json>'

Options:
  --owner        Owner name for wallet generation
  --from-owner   Sender name for demo signing flow
  --to-owner     Recipient name for demo signing flow
  --amount       Transfer amount
  --fee          Transaction fee
  --memo         Optional note
  --payload      JSON string containing a signed transaction
  --json         Prints raw JSON
  --help         Show this message
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

function runDemo() {
  const alice = signatureService.generateWallet({ owner: "Alice" });
  const bob = signatureService.generateWallet({ owner: "Bob" });
  const signedTransaction = signatureService.signTransaction(
    {
      fromAddress: alice.address,
      toAddress: bob.address,
      amount: 25,
      fee: 1,
      memo: "Study transfer"
    },
    alice.privateKey,
    alice.publicKey
  );

  return {
    wallets: {
      alice: {
        owner: alice.owner,
        address: alice.address,
        publicKey: alice.publicKey
      },
      bob: {
        owner: bob.owner,
        address: bob.address,
        publicKey: bob.publicKey
      }
    },
    signedTransaction,
    verified: signatureService.verifySignedTransaction(signedTransaction)
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

  if (command === "generate-wallet") {
    const wallet = signatureService.generateWallet({
      owner: args.owner ?? "Anonymous"
    });

    output(wallet, asJson);
    return;
  }

  if (command === "sign-transaction") {
    const sender = signatureService.generateWallet({
      owner: args["from-owner"] ?? "Alice"
    });
    const recipient = signatureService.generateWallet({
      owner: args["to-owner"] ?? "Bob"
    });
    const signedTransaction = signatureService.signTransaction(
      {
        fromAddress: sender.address,
        toAddress: recipient.address,
        amount: Number(args.amount ?? 10),
        fee: Number(args.fee ?? 0),
        memo: args.memo ?? ""
      },
      sender.privateKey,
      sender.publicKey
    );

    output(
      {
        sender: {
          owner: sender.owner,
          address: sender.address,
          publicKey: sender.publicKey,
          privateKey: sender.privateKey
        },
        recipient: {
          owner: recipient.owner,
          address: recipient.address,
          publicKey: recipient.publicKey
        },
        signedTransaction
      },
      asJson
    );
    return;
  }

  if (command === "verify-transaction") {
    const payload = JSON.parse(args.payload ?? "{}");
    output(
      {
        verified: signatureService.verifySignedTransaction(payload)
      },
      asJson
    );
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
