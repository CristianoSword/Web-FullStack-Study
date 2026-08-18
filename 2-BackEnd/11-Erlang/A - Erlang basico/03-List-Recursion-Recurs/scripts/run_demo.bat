@echo off
setlocal
erlc -o ebin src\list_recursion_recurs.erl src\list_recursion_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
