# Stand-alone Wasm Wasi

Source-complete standalone Wasm project for WASI runtimes using a Rust command-line application. The binary reads a JSON work plan from the mounted filesystem, computes a summary, and prints or writes the result through a WASI runtime such as Wasmtime or Wasmer.

## Structure

- `Cargo.toml`: Rust binary crate with serde support.
- `src/models.rs`: input plan and output summary models.
- `src/main.rs`: CLI entrypoint, filesystem IO and summary generation.
- `data/sample-plan.json`: sample input mounted into the runtime.
- `build.sh` / `build.bat`: `wasm32-wasip1` build commands.
- `scripts/run-with-wasmtime.*`: sample Wasmtime invocations.
- `scripts/run-with-wasmer.*`: sample Wasmer invocations.
- `output/.gitkeep`: expected writable output directory.

## Features

- standalone WASI binary target
- reads JSON from mounted host filesystem
- writes summary JSON back to a mounted directory
- validates titles, team names, task names and estimates
- works with both Wasmtime and Wasmer command patterns

## Build

```bash
cargo build --release --target wasm32-wasip1
```

Example runtime execution:

```bash
wasmtime run --dir . target/wasm32-wasip1/release/standalone_wasm_wasi.wasm data/sample-plan.json output/summary.json
```

## Validation

The current environment does not include the WASI toolchain/runtime, so this project was validated statically:

- target and runtime commands align with `wasm32-wasip1`
- filesystem paths used by the runtime scripts exist in the repository
- CLI, model and output flow are consistent across source files
