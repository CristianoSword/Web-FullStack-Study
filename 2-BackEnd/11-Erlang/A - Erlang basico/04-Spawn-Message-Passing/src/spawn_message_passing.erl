-module(spawn_message_passing).

-export([
    start_peer/1,
    new_message/3,
    send_message/2,
    peer_inbox/1,
    stop_peer/1,
    conversation_demo/0
]).

-include_lib("eunit/include/eunit.hrl").
-include("spawn_message.hrl").

start_peer(Name) when is_binary(Name), byte_size(Name) > 0 ->
    spawn_link(fun() -> peer_loop(#peer_state{name = Name, inbox = []}) end).

new_message(From, To, Body)
when is_binary(From), is_binary(To), is_binary(Body), byte_size(Body) > 0 ->
    #chat_message{from = From, to = To, body = Body};
new_message(_From, _To, _Body) ->
    error({invalid_message, expected_non_empty_binaries}).

send_message(PeerPid, Message = #chat_message{}) when is_pid(PeerPid) ->
    PeerPid ! {deliver, self(), Message},
    receive
        {delivered, PeerPid, Message} ->
            ok;
        {delivery_error, PeerPid, Reason} ->
            {error, Reason}
    after 1000 ->
        timeout
    end;
send_message(_PeerPid, _Message) ->
    error({invalid_send, expected_pid_and_chat_message}).

peer_inbox(PeerPid) when is_pid(PeerPid) ->
    PeerPid ! {snapshot, self()},
    receive
        {peer_snapshot, PeerPid, Inbox} ->
            Inbox
    after 1000 ->
        timeout
    end;
peer_inbox(_PeerPid) ->
    error({invalid_peer, expected_pid}).

stop_peer(PeerPid) when is_pid(PeerPid) ->
    PeerPid ! {stop, self()},
    receive
        {peer_stopped, PeerPid} ->
            ok
    after 1000 ->
        timeout
    end;
stop_peer(_PeerPid) ->
    error({invalid_peer, expected_pid}).

conversation_demo() ->
    Alice = start_peer(<<"alice">>),
    Bob = start_peer(<<"bob">>),
    MessageOne = new_message(<<"alice">>, <<"bob">>, <<"hello bob">>),
    MessageTwo = new_message(<<"bob">>, <<"alice">>, <<"hello alice">>),
    try
        ok = send_message(Bob, MessageOne),
        ok = send_message(Alice, MessageTwo),
        #conversation_summary{
            sent = 2,
            delivered = 2,
            inbox = [
                {alice, peer_inbox(Alice)},
                {bob, peer_inbox(Bob)}
            ]
        }
    after
        ok = stop_peer(Alice),
        ok = stop_peer(Bob)
    end.

peer_loop(State = #peer_state{name = Name, inbox = Inbox}) ->
    receive
        {deliver, Sender, Message = #chat_message{to = Name}} ->
            Sender ! {delivered, self(), Message},
            peer_loop(State#peer_state{inbox = [Message | Inbox]});
        {deliver, Sender, #chat_message{to = WrongPeer}} ->
            Sender ! {delivery_error, self(), {wrong_recipient, WrongPeer, Name}},
            peer_loop(State);
        {snapshot, Sender} ->
            Sender ! {peer_snapshot, self(), lists:reverse(Inbox)},
            peer_loop(State);
        {stop, Sender} ->
            Sender ! {peer_stopped, self()},
            ok
    end.

conversation_demo_test() ->
    Summary = conversation_demo(),
    [{alice, AliceInbox}, {bob, BobInbox}] = Summary#conversation_summary.inbox,
    ?assertEqual(2, Summary#conversation_summary.sent),
    ?assertEqual(2, Summary#conversation_summary.delivered),
    ?assertEqual(1, length(AliceInbox)),
    ?assertEqual(1, length(BobInbox)).

wrong_recipient_test() ->
    Alice = start_peer(<<"alice">>),
    WrongMessage = new_message(<<"bob">>, <<"charlie">>, <<"ping">>),
    try
        ?assertMatch({error, {wrong_recipient, <<"charlie">>, <<"alice">>}}, send_message(Alice, WrongMessage)),
        ?assertEqual([], peer_inbox(Alice))
    after
        ok = stop_peer(Alice)
    end.

new_message_validation_test() ->
    ?assertError(
        {invalid_message, expected_non_empty_binaries},
        new_message(<<"alice">>, <<"bob">>, <<>>)
    ),
    ?assertError(
        {invalid_send, expected_pid_and_chat_message},
        send_message(not_a_pid, invalid_message)
    ).
