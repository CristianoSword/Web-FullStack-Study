-module(tcp_chat_room_tests).

-include_lib("eunit/include/eunit.hrl").

room_broadcast_test() ->
    {ok, Pid} = tcp_chat_room:start_link(),
    BobPid = spawn(fun() -> receive after infinity -> ok end end),
    try
        ?assertMatch({ok, _}, tcp_chat_room:join(<<"alice">>, undefined, self())),
        ?assertEqual({chat_notice, <<"[system] alice joined the room\n">>}, receive_notice()),
        ?assertMatch({ok, _}, tcp_chat_room:join(<<"bob">>, undefined, BobPid)),
        ?assertEqual({chat_notice, <<"[system] bob joined the room\n">>}, receive_notice()),
        tcp_chat_room:publish(<<"alice">>, <<"hello">>),
        ?assertEqual({chat_notice, <<"[alice] hello\n">>}, receive_notice()),
        History = tcp_chat_room:history(),
        ?assertEqual(1, length(History))
    after
        exit(BobPid, kill),
        gen_server:stop(Pid)
    end.

invalid_nickname_test() ->
    {ok, Pid} = tcp_chat_room:start_link(),
    try
        ?assertEqual({error, invalid_nickname}, tcp_chat_room:join(<<>>, undefined, self())),
        tcp_chat_room:publish(<<>>, <<"hello">>),
        ?assertEqual([], tcp_chat_room:history())
    after
        gen_server:stop(Pid)
    end.

receive_notice() ->
    receive
        Message ->
            Message
    after 1000 ->
        timeout
    end.
