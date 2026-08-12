# High Performance Image Filter Wasm

Source-complete WebAssembly image-filter project using Rust and browser canvas rendering. The app loads an uploaded image into a canvas, sends its RGBA buffer into Wasm, and applies pixel-by-pixel filter presets in the module.

## Structure

- `Cargo.toml`: Rust crate definition for a WebAssembly library.
- `src/preset.rs`: strongly typed filter presets.
- `src/lib.rs`: exported image-filter function operating over RGBA bytes.
- `build.sh` / `build.bat`: `wasm-pack` build commands.
- `web/presets.js`: available UI presets.
- `web/validator.js`: file and preset validation rules.
- `web/app.js`: browser bootstrap, upload handling and canvas updates.
- `web/index.html`: demo UI with upload and filter buttons.

## Features

- grayscale, contrast and warm-tone pixel filters
- canvas-based preview workflow
- RGBA buffer processing inside Rust/Wasm
- browser-side validation for uploads and preset selection
- Wasm-side validation for malformed pixel buffers

## Build

```bash
wasm-pack build --target web --out-dir pkg
```

Then serve the folder and open `web/index.html`.

## Validation

The local environment does not currently include the Rust/Wasm toolchain, so this project was validated statically:

- exported Rust API aligns with the browser integration
- filter presets are represented concretely in both Rust and JS
- README commands and paths match the implemented project layout
