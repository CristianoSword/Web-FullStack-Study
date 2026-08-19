-module(rebar3_setup_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Worker = #{
        id => rebar3_setup_service,
        start => {rebar3_setup_service, start_link, []},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [rebar3_setup_service]
    },
    {ok, {{one_for_one, 5, 10}, [Worker]}}.
