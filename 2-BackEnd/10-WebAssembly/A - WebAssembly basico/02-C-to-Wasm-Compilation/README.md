# C to Wasm Compilation

Source-complete WebAssembly project that compiles C source to `.wasm` with Emscripten. The project ships real C source, build scripts, JS glue and an HTML demo page that consumes the generated WebAssembly module.

## Structure

- `src/math_metrics.h`: exported function declarations.
- `src/math_metrics.c`: C implementations for sum, weighted average and clamp helpers.
- `build.sh` and `build.bat`: Emscripten build commands for generating `dist/math_metrics.js` and `dist/math_metrics.wasm`.
- `web/metric_jobs.js`: sample datasets.
- `web/validator.js`: browser-side validation for metric jobs.
- `web/app.js`: module loader and memory bridge between JS and Wasm.
- `web/index.html`: demo UI.

## Features

- C functions exported to WebAssembly
- Emscripten modular ES module output
- JS memory allocation with `_malloc` and `_free`
- browser demo for sample datasets
- input validation on both the C and JS sides

## Build

```bash
./build.sh
```

On Windows:

```bat
build.bat
```

Then serve the folder with a static server and open `web/index.html`.

## Validation

The local machine does not currently include the Emscripten toolchain, so this project was validated statically:

- build scripts reference the real exported C symbols
- JS glue matches the Wasm memory layout and exported function names
- HTML demo consumes the source files present in the project
