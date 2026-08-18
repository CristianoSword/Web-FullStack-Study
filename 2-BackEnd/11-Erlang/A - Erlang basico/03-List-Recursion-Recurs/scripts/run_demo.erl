-module(run_demo).
-export([main/0]).

main() ->
    Job = list_recursion_recurs:new_job(<<"demo">>, [5, 10, 13, 16, 21]),
    io:format("~p~n", [list_recursion_recurs:analyze(Job)]),
    init:stop().
