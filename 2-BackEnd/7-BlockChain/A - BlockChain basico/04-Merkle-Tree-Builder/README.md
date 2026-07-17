# Merkle Tree Builder

Node.js project that builds a Merkle tree from block data, computes the root, generates inclusion proofs, and verifies them.

## Features

- SHA-256 hashing for leaves and internal nodes
- Automatic handling of odd leaf counts by duplicating the last node in a level
- Root calculation from arbitrary leaf lists
- Inclusion proof generation for a target leaf
- Proof verification for integrity checks
- CLI commands for demo, root extraction, proof generation, and proof validation

## Commands

```bash
npm install
npm run demo -- --json
npm run root -- --values "tx1,tx2,tx3,tx4" --json
npm run proof -- --values "tx1,tx2,tx3,tx4" --leaf "tx3" --json
node src/index.js verify --proof '<json-proof>' --json
```

## Validation Rules

- The leaf list must be a non-empty array of non-empty strings.
- The target leaf must exist in the current tree to generate a proof.
- Proof roots and sibling hashes must be valid 64-character hexadecimal SHA-256 digests.
- Sibling directions are constrained to `left` or `right`.
