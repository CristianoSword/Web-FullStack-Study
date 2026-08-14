# Cryptography Hashing Wasm

Source-complete WebAssembly cryptography project using Rust for AES-128-CTR and SHA-256 operations. The browser UI sends text, key and nonce values into the Wasm module, which performs encryption, decryption and digest generation.

## Structure

- `Cargo.toml`: Rust crate with `aes`, `ctr`, `sha2`, `hex` and `wasm-bindgen`.
- `src/models.rs`: payload models for crypto and hashing flows.
- `src/lib.rs`: AES-128-CTR encryption/decryption and SHA-256 digest exports.
- `build.sh` / `build.bat`: `wasm-pack` build commands.
- `web/sample_inputs.js`: example plaintext, key, nonce and hash input.
- `web/validator.js`: browser-side validation for hex strings and messages.
- `web/app.js`: interactive bridge between browser controls and Wasm exports.
- `web/index.html`: crypto console UI.

## Features

- AES-128-CTR encryption in Rust/Wasm
- AES-128-CTR decryption in Rust/Wasm
- SHA-256 digest generation
- browser-side validation for 16-byte hex key/nonce values
- Wasm-side validation for empty payloads and malformed hex

## Build

```bash
wasm-pack build --target web --out-dir pkg
```

Then serve the folder and open `web/index.html`.

## Validation

The current environment does not include the Rust/Wasm toolchain, so this project was validated statically:

- dependencies and cipher mode align with the exported functions
- browser inputs match the Wasm API contract
- README commands and file paths match the project layout
