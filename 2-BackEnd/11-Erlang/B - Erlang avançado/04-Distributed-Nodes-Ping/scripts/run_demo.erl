-module(run_demo).

-export([main/0]).

main() ->
    {ok, SupPid} = distributed_ping_sup:start_link(),
    io:format("~p~n", [distributed_ping_service:run_demo()]),
    unlink(SupPid),
    exit(SupPid, shutdown),
    init:stop().
