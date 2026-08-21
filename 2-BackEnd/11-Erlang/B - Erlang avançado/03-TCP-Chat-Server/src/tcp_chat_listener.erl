-module(tcp_chat_listener).

-export([start/1]).

start(Port) ->
    {ok, ListenSocket} = gen_tcp:listen(Port, [binary, {packet, line}, {active, false}, {reuseaddr, true}]),
    spawn_link(fun() -> accept_loop(ListenSocket) end).

accept_loop(ListenSocket) ->
    {ok, Socket} = gen_tcp:accept(ListenSocket),
    tcp_chat_session:start(Socket),
    accept_loop(ListenSocket).
