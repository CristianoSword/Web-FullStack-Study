-module(ets_cache_service_tests).

-include_lib("eunit/include/eunit.hrl").
-include("../src/ets_cache.hrl").

ttl_expiration_test() ->
    {ok, Pid} = ets_cache_service:start_link(),
    try
        ?assertMatch({ok, _}, ets_cache_service:put(<<"token">>, <<"secret">>, 1)),
        ?assertEqual({ok, <<"secret">>}, ets_cache_service:get(<<"token">>)),
        timer:sleep(1200),
        ?assertEqual(not_found, ets_cache_service:get(<<"token">>))
    after
        gen_server:stop(Pid)
    end.

metrics_and_eviction_test() ->
    {ok, Pid} = ets_cache_service:start_link(),
    try
        ?assertMatch({ok, _}, ets_cache_service:put(<<"profile">>, #{name => <<"Ada">>}, 1)),
        ?assertEqual({ok, #{name => <<"Ada">>}}, ets_cache_service:get(<<"profile">>)),
        timer:sleep(1200),
        ?assertEqual({ok, 1}, ets_cache_service:evict_expired()),
        Metrics = ets_cache_service:metrics(),
        ?assertEqual(1, Metrics#cache_metrics.hits),
        ?assertEqual(1, Metrics#cache_metrics.writes)
    after
        gen_server:stop(Pid)
    end.

invalid_input_test() ->
    {ok, Pid} = ets_cache_service:start_link(),
    try
        ?assertEqual({error, invalid_key}, ets_cache_service:put(<<>>, value, 10)),
        ?assertEqual({error, invalid_ttl}, ets_cache_service:put(<<"key">>, value, 0)),
        ?assertEqual({error, invalid_key}, ets_cache_service:get(<<>>)),
        ?assertEqual({error, invalid_key}, ets_cache_service:delete(<<>>))
    after
        gen_server:stop(Pid)
    end.
