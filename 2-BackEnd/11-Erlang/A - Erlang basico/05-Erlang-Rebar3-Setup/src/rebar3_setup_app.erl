-module(rebar3_setup_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    rebar3_setup_sup:start_link().

stop(_State) ->
    ok.
