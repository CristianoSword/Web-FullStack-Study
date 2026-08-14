# Audio Synthesizer Wasm

Source-complete WebAssembly audio synthesizer using Rust-generated PCM buffers and the Web Audio API. The Wasm module creates audio samples with an ADSR envelope, and the browser plays the result through an `AudioContext`.

## Structure

- `Cargo.toml`: Rust crate with `wasm-bindgen` and serde support.
- `src/models.rs`: synth configuration and ADSR envelope models.
- `src/lib.rs`: PCM sample generation with harmonic layering and ADSR shaping.
- `build.sh` / `build.bat`: `wasm-pack` build commands.
- `web/presets.js`: browser presets for musical voices.
- `web/validator.js`: browser-side synth validation.
- `web/app.js`: UI bridge and Web Audio playback.
- `web/index.html`: synth control panel.

## Features

- Rust/Wasm PCM generation
- ADSR envelope shaping
- preset-based synth configuration
- Web Audio API playback
- validation for frequency, duration, gain and sample rate

## Build

```bash
wasm-pack build --target web --out-dir pkg
```

Then serve the folder and open `web/index.html`.

## Validation

The current environment does not include the Rust/Wasm toolchain, so this project was validated statically:

- Wasm API matches the browser playback flow
- presets and synth config map directly to the Rust model
- README commands and source files match the implemented layout
