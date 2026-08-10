# Rust Wasm Bindgen

Source-complete Rust project exporting WebAssembly functions with `wasm-bindgen`. The project serializes JS inputs into Rust structs, computes score analysis in Wasm, and renders the results back in the browser.

## Structure

- `Cargo.toml`: Rust crate definition with `wasm-bindgen`, `serde` and `serde-wasm-bindgen`.
- `src/models.rs`: typed dataset and result models.
- `src/lib.rs`: exported Wasm functions for dataset analysis and value scaling.
- `build.sh` / `build.bat`: `wasm-pack` build commands.
- `web/sample_inputs.js`: sample datasets passed into Wasm.
- `web/validator.js`: browser-side input validation.
- `web/app.js`: JS bootstrap for loading the generated package.
- `web/index.html`: demo page.

## Features

- Rust structs serialized from JavaScript
- `wasm-bindgen` exports returning JS-friendly values
- validation for labels and non-empty numeric arrays
- browser rendering of totals, averages and peaks

## Build

```bash
wasm-pack build --target web --out-dir pkg
```

Then serve the folder and open `web/index.html`.

## Validation

The local environment does not include the Rust/Wasm toolchain, so this project was validated statically:

- `Cargo.toml` dependencies and crate type match `wasm-bindgen` usage
- exported Rust functions align with the JavaScript bootstrap
- demo web files import the generated package in the expected layout
