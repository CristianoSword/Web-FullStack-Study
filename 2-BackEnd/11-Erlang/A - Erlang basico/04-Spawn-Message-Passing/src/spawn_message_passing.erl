-module(spawn_message_passing).

-export([
    start_peer/1,
    new_message/3,
    send_message/2,
    peer_inbox/1,
    stop_peer/1,
    conversation_demo/0
]).

-include("spawn_message.hrl").

start_peer(Name) ->
    spawn_link(fun() -> peer_loop(#peer_state{name = Name, inbox = []}) end).

new_message(From, To, Body) ->
    #chat_message{from = From, to = To, body = Body}.

send_message(PeerPid, Message) ->
    PeerPid ! {deliver, self(), Message},
    receive
        {delivered, PeerPid, Message} ->
            ok
    after 1000 ->
        timeout
    end.

peer_inbox(PeerPid) ->
    PeerPid ! {snapshot, self()},
    receive
        {peer_snapshot, PeerPid, Inbox} ->
            Inbox
    after 1000 ->
        timeout
    end.

stop_peer(PeerPid) ->
    PeerPid ! stop,
    ok.

conversation_demo() ->
    Alice = start_peer(<<"alice">>),
    Bob = start_peer(<<"bob">>),
    MessageOne = new_message(<<"alice">>, <<"bob">>, <<"hello bob">>),
    MessageTwo = new_message(<<"bob">>, <<"alice">>, <<"hello alice">>),
    ok = send_message(Bob, MessageOne),
    ok = send_message(Alice, MessageTwo),
    #conversation_summary{
        sent = 2,
        delivered = 2,
        inbox = [
            {alice, peer_inbox(Alice)},
            {bob, peer_inbox(Bob)}
        ]
    }.

peer_loop(State = #peer_state{inbox = Inbox}) ->
    receive
        {deliver, Sender, Message} ->
            Sender ! {delivered, self(), Message},
            peer_loop(State#peer_state{inbox = [Message | Inbox]});
        {snapshot, Sender} ->
            Sender ! {peer_snapshot, self(), lists:reverse(Inbox)},
            peer_loop(State);
        stop ->
            ok
    end.
