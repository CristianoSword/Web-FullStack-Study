@echo off
setlocal
if not exist dist mkdir dist
wat2wasm src\handwritten_math.wat -o dist\handwritten_math.wasm
