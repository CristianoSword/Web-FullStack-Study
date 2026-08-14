#!/usr/bin/env bash
set -euo pipefail
cargo build --release --target wasm32-wasip1
