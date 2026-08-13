# Physics Engine 2D Wasm

Source-complete WebAssembly project for 2D body simulation using Rust and browser canvas rendering. The Rust/Wasm module advances body motion, gravity and collisions, while the browser paints the resulting state on a canvas loop.

## Structure

- `Cargo.toml`: Rust crate definition with `wasm-bindgen` and serde support.
- `src/models.rs`: body and world-configuration models.
- `src/lib.rs`: simulation step, boundary handling and body collision resolution.
- `build.sh` / `build.bat`: `wasm-pack` build commands.
- `web/sample_world.js`: initial world state and configuration.
- `web/validator.js`: browser-side world validation.
- `web/app.js`: animation loop and canvas renderer.
- `web/index.html`: demo UI.

## Features

- gravity and damping integration
- wall collision response
- simple circle-body collision resolution
- canvas visualization with play/pause/reset controls
- Rust and JS validation for malformed worlds

## Build

```bash
wasm-pack build --target web --out-dir pkg
```

Then serve the folder and open `web/index.html`.

## Validation

The local environment does not include the Rust/Wasm toolchain, so this project was validated statically:

- exported simulation API matches the browser animation loop
- serde-based world models align with the JS sample world
- README commands and source layout match the actual files
