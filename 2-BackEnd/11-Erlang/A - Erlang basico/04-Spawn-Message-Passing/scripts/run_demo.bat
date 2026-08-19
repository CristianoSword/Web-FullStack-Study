@echo off
setlocal
erlc -o ebin src\spawn_message_passing.erl src\spawn_message_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
