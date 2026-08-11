#!/usr/bin/env bash
set -euo pipefail
mkdir -p dist
wat2wasm src/handwritten_math.wat -o dist/handwritten_math.wasm
