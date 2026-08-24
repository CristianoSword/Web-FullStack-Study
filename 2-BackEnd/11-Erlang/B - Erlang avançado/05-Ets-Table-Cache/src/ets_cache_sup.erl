-module(ets_cache_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Worker = #{
        id => ets_cache_service,
        start => {ets_cache_service, start_link, []},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [ets_cache_service]
    },
    {ok, {{one_for_one, 5, 10}, [Worker]}}.
