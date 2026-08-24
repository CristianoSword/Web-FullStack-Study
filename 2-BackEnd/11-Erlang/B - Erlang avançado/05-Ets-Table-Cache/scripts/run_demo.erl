-module(run_demo).

-export([main/0]).

main() ->
    {ok, SupPid} = ets_cache_sup:start_link(),
    {ok, _} = ets_cache_service:put(<<"profile:1">>, #{name => <<"Ada">>}, 30),
    {ok, _} = ets_cache_service:put(<<"token:1">>, <<"abc123">>, 1),
    io:format("~p~n", [ets_cache_service:get(<<"profile:1">>)]),
    timer:sleep(1200),
    io:format("~p~n", [ets_cache_service:get(<<"token:1">>)]),
    io:format("~p~n", [ets_cache_service:metrics()]),
    unlink(SupPid),
    exit(SupPid, shutdown),
    init:stop().
