@echo off
setlocal
erlc -o ebin src\tcp_chat_app.erl src\tcp_chat_sup.erl src\tcp_chat_room.erl src\tcp_chat_listener.erl src\tcp_chat_session.erl src\tcp_chat_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
