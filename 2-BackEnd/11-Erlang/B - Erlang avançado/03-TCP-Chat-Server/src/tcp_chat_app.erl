-module(tcp_chat_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    tcp_chat_sup:start_link().

stop(_State) ->
    ok.
