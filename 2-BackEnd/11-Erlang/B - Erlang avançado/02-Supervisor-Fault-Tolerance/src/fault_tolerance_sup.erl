-module(fault_tolerance_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Worker = #{
        id => fault_tolerance_worker,
        start => {fault_tolerance_worker, start_link, []},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [fault_tolerance_worker]
    },
    {ok, {{one_for_one, 5, 10}, [Worker]}}.
