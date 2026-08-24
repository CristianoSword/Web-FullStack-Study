@echo off
setlocal
erlc -o ebin src\distributed_ping_app.erl src\distributed_ping_sup.erl src\distributed_ping_service.erl src\distributed_ping_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
