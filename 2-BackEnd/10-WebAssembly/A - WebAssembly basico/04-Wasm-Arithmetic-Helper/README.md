# Wasm Arithmetic Helper

Source-complete WebAssembly project for browser-side arithmetic helpers compiled from C. The module performs vector dot products, matrix traces and normalization while the browser handles data marshaling and result rendering.

## Structure

- `src/arithmetic_helper.h`: exported helper signatures.
- `src/arithmetic_helper.c`: C implementations for vector and matrix arithmetic.
- `build.sh` / `build.bat`: Emscripten build scripts.
- `web/jobs.js`: sample arithmetic workloads.
- `web/validator.js`: input validation before sending data to Wasm.
- `web/app.js`: memory bridge using `HEAPF64`, `_malloc` and `_free`.
- `web/index.html`: demo page.

## Features

- vector dot product in C/Wasm
- matrix trace calculation in C/Wasm
- score normalization helper
- Float64 memory transfer between JS and Wasm
- validation on both JS and C sides

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

The current machine does not include the Emscripten toolchain, so this project was validated statically:

- build scripts export the real C symbols used by the browser code
- JS glue matches the `Float64Array` memory layout expected by the Wasm module
- source files and README flow are aligned
