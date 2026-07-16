# Digital Signature Keys

Node.js project that demonstrates public/private key generation, transaction signing, and signature verification for blockchain study flows.

## Features

- Wallet generation with elliptic curve keys (`secp256k1` by default)
- Derived blockchain-style addresses from the public key
- Deterministic transaction serialization
- ECDSA signing for fictitious transfer transactions
- Signature verification with address consistency checks
- CLI entrypoint for wallet creation, signing, verification, and full demo execution

## Commands

```bash
npm install
npm run demo -- --json
npm run generate -- --owner "Alice" --json
npm run sign -- --from-owner "Alice" --to-owner "Bob" --amount 25 --fee 1 --memo "Invoice 204" --json
node src/index.js verify-transaction --payload '<signed-json>' --json
```

## CLI Reference

### Generate wallet

```bash
node src/index.js generate-wallet --owner "Alice" --json
```

### Sign transaction

```bash
node src/index.js sign-transaction \
  --from-owner "Alice" \
  --to-owner "Bob" \
  --amount 25 \
  --fee 1 \
  --memo "Study transfer" \
  --json
```

### Verify signed payload

```bash
node src/index.js verify-transaction --payload '<signed-json>' --json
```

## Validation Rules

- Wallet owners must have at least 2 characters.
- Supported curves are `secp256k1` and `prime256v1`.
- Transaction addresses must be 40-character hexadecimal hashes.
- Amount must be positive, fee cannot be negative, and memo is limited to 140 characters.
- The signer public key must map back to the `fromAddress` before a transaction is accepted as valid.
