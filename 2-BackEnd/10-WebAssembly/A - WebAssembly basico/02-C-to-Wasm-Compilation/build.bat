@echo off
setlocal
if not exist dist mkdir dist
emcc src\math_metrics.c -O2 -s WASM=1 -s MODULARIZE=1 -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS=["_sum_range","_weighted_average","_clamp_score","_malloc","_free"] -o dist\math_metrics.js
