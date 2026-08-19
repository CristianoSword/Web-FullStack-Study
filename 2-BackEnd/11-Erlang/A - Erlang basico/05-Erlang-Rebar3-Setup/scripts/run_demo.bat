@echo off
setlocal
erlc -o ebin src\rebar3_setup_app.erl src\rebar3_setup_sup.erl src\rebar3_setup_service.erl src\rebar3_setup_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
