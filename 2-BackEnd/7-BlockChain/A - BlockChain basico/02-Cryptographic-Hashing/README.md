# Cryptographic Hashing

Utility project focused on cryptographic hashing fundamentals for blockchain studies.

## Features

- Hash generation with `sha256`, `sha384`, and `sha512`
- Salted payload processing
- Constant-time hash verification
- Digest comparison for collision experiments
- CLI interface for hashing, verification, and comparison flows

## Run

```bash
npm install
npm run hash -- --text "hello-blockchain" --salt "study" --algo sha256 --json
npm run verify -- --text "hello-blockchain" --salt "study" --algo sha256 --digest "<digest>" --json
node src/index.js compare --left "block-a" --right "block-b" --salt "study" --json
```

## Commands

### Hash payload

```bash
node src/index.js hash --text "payload" --salt "optional" --algo sha256 --json
```

### Verify digest

```bash
node src/index.js verify --text "payload" --digest "<hex>" --salt "optional" --algo sha256 --json
```

### Compare two payloads

```bash
node src/index.js compare --left "payload-a" --right "payload-b" --salt "optional" --algo sha256 --json
```

## Validation Notes

- Empty payloads are rejected.
- Unsupported algorithms throw clear errors.
- Digests must match the expected hexadecimal size for the selected algorithm.
- Verification uses `crypto.timingSafeEqual` to avoid naive string comparisons.
