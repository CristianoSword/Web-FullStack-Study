@echo off
setlocal
wasmtime run --dir . target\wasm32-wasip1\release\standalone_wasm_wasi.wasm data\sample-plan.json output\summary.json
