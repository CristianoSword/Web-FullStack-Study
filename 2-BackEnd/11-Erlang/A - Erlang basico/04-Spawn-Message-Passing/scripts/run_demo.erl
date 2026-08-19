-module(run_demo).

-export([main/0]).

main() ->
    io:format("~p~n", [spawn_message_passing:conversation_demo()]),
    init:stop().
