@echo off
setlocal
erlc -o ebin src\pattern_matching_functions.erl src\pattern_types.erl
erlc -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
