@echo off
setlocal
erlc -o ebin src\fault_tolerance_app.erl src\fault_tolerance_sup.erl src\fault_tolerance_worker.erl src\fault_tolerance_control.erl src\fault_tolerance_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
