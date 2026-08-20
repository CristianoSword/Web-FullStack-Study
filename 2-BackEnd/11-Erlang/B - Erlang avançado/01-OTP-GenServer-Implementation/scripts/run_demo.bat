@echo off
setlocal
erlc -o ebin src\otp_genserver_app.erl src\otp_genserver_sup.erl src\otp_genserver_ledger.erl src\otp_genserver_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
