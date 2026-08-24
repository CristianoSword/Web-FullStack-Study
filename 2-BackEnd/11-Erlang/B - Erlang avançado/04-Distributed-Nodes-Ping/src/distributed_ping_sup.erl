-module(distributed_ping_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Worker = #{
        id => distributed_ping_service,
        start => {distributed_ping_service, start_link, []},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [distributed_ping_service]
    },
    {ok, {{one_for_one, 5, 10}, [Worker]}}.
