@echo off
setlocal
erlc -o ebin src\eshell_operations.erl src\eshell_types.erl
erlc -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
