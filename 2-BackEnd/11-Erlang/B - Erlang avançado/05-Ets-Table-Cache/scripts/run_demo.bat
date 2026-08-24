@echo off
setlocal
erlc -o ebin src\ets_cache_app.erl src\ets_cache_sup.erl src\ets_cache_service.erl src\ets_cache_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
