-module(run_demo).

-export([main/0]).

main() ->
    Port = 4055,
    {ok, SupPid} = tcp_chat_sup:start_link(),
    ListenerPid = tcp_chat_listener:start(Port),
    timer:sleep(100),
    {ok, Alice} = gen_tcp:connect("localhost", Port, [binary, {packet, line}, {active, false}]),
    {ok, _} = gen_tcp:recv(Alice, 0),
    ok = gen_tcp:send(Alice, <<"alice\n">>),
    {ok, _} = gen_tcp:recv(Alice, 0),
    {ok, _} = gen_tcp:recv(Alice, 0),
    {ok, Bob} = gen_tcp:connect("localhost", Port, [binary, {packet, line}, {active, false}]),
    {ok, _} = gen_tcp:recv(Bob, 0),
    ok = gen_tcp:send(Bob, <<"bob\n">>),
    {ok, _} = gen_tcp:recv(Bob, 0),
    {ok, _} = gen_tcp:recv(Bob, 0),
    {ok, AliceJoinNotice} = gen_tcp:recv(Alice, 0),
    ok = gen_tcp:send(Alice, <<"hello from alice\n">>),
    {ok, BobMessage} = gen_tcp:recv(Bob, 0),
    io:format("~p~n", [{alice_join_notice, AliceJoinNotice}]),
    io:format("~p~n", [{bob_received, BobMessage}]),
    gen_tcp:send(Bob, <<"/quit\n">>),
    gen_tcp:send(Alice, <<"/quit\n">>),
    gen_tcp:close(Bob),
    gen_tcp:close(Alice),
    exit(ListenerPid, shutdown),
    unlink(SupPid),
    exit(SupPid, shutdown),
    init:stop().
