# Wat Text Format Handwritten

Source-complete WebAssembly text-format project with a handwritten `.wat` module. The repository includes a manual WAT implementation, a `wat2wasm` build step and a browser demo that loads the compiled binary through the native WebAssembly API.

## Structure

- `src/handwritten_math.wat`: handwritten WebAssembly text-format source.
- `build.sh` / `build.bat`: `wat2wasm` build commands.
- `web/module_exports.js`: export definitions and arity metadata.
- `web/jobs.js`: sample invocations for each export.
- `web/validator.js`: pre-execution validation.
- `web/app.js`: browser loader using `WebAssembly.instantiate`.
- `web/index.html`: demo UI.

## Features

- handwritten WAT source instead of a generated module
- exported integer math functions
- loop-based triangular number implementation
- browser execution via native WebAssembly APIs
- job validation before dispatch

## Build

```bash
./build.sh
```

or on Windows:

```bat
build.bat
```

Then serve the folder and open `web/index.html`.

## Validation

The current environment does not include `wat2wasm`, so this project was validated statically:

- WAT exports align with the browser-side job definitions
- the build scripts target the real `.wat` source and `.wasm` output path
- the demo loads the expected `dist/handwritten_math.wasm` artifact
