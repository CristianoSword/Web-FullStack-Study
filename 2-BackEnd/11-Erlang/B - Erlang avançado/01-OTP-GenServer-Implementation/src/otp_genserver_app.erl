-module(otp_genserver_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    otp_genserver_sup:start_link().

stop(_State) ->
    ok.
