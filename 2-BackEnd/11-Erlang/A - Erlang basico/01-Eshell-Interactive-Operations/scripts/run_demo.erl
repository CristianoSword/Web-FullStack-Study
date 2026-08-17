-module(run_demo).
-export([main/0]).

main() ->
    Session = eshell_operations:new_session(<<"study-session">>, [4, 7, 12, 19, 22], [math, shell, demo]),
    io:format("~p~n", [eshell_operations:summary(Session)]),
    init:stop().
