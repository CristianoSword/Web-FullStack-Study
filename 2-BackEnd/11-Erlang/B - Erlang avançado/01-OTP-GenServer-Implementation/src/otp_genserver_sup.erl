-module(otp_genserver_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    LedgerWorker = #{
        id => otp_genserver_ledger,
        start => {otp_genserver_ledger, start_link, []},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [otp_genserver_ledger]
    },
    {ok, {{one_for_one, 5, 10}, [LedgerWorker]}}.
