-module(distributed_ping_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    distributed_ping_sup:start_link().

stop(_State) ->
    ok.
