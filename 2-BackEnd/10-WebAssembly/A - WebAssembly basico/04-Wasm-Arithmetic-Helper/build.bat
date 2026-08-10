@echo off
setlocal
if not exist dist mkdir dist
emcc src\arithmetic_helper.c -O2 -s WASM=1 -s MODULARIZE=1 -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS=["_vector_dot_product","_matrix_trace","_normalize_score","_malloc","_free"] -o dist\arithmetic_helper.js
