-module(run_demo).

-export([main/0]).

main() ->
    {ok, Pid} = rebar3_setup_service:start_link(),
    io:format("~p~n", [rebar3_setup_service:bootstrap_report()]),
    exit(Pid, shutdown),
    init:stop().
