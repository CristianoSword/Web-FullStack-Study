-module(tcp_chat_room).
-behaviour(gen_server).

-export([
    start_link/0,
    join/3,
    leave/1,
    publish/2,
    history/0
]).

-export([
    init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3
]).

-include_lib("eunit/include/eunit.hrl").
-include("tcp_chat.hrl").

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

join(Nickname, Socket, Pid) ->
    gen_server:call(?MODULE, {join, Nickname, Socket, Pid}).

leave(Nickname) ->
    gen_server:cast(?MODULE, {leave, Nickname}).

publish(From, Body) ->
    gen_server:cast(?MODULE, {publish, From, Body}).

history() ->
    gen_server:call(?MODULE, history).

init([]) ->
    {ok, #chat_room_state{clients = #{}, history = []}}.

handle_call({join, Nickname, Socket, Pid}, _From, State = #chat_room_state{clients = Clients}) ->
    case validate_nickname(Nickname) of
        ok ->
            case maps:is_key(Nickname, Clients) of
                true ->
                    {reply, {error, nickname_taken}, State};
                false ->
                    Client = #chat_client{nickname = Nickname, socket = Socket, pid = Pid},
                    NewClients = Clients#{Nickname => Client},
                    notice_all(io_lib:format("[system] ~s joined the room~n", [binary_to_list(Nickname)]), NewClients),
                    {reply, {ok, Client}, State#chat_room_state{clients = NewClients}}
            end;
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call(history, _From, State = #chat_room_state{history = History}) ->
    {reply, lists:reverse(History), State};
handle_call(_Request, _From, State) ->
    {reply, {error, unsupported_call}, State}.

handle_cast({leave, Nickname}, State = #chat_room_state{clients = Clients}) ->
    case maps:take(Nickname, Clients) of
        error ->
            {noreply, State};
        {_Client, RemainingClients} ->
            notice_all(io_lib:format("[system] ~s left the room~n", [binary_to_list(Nickname)]), RemainingClients),
            {noreply, State#chat_room_state{clients = RemainingClients}}
    end;
handle_cast({publish, From, Body}, State = #chat_room_state{clients = Clients, history = History}) ->
    case {validate_nickname(From), validate_body(Body)} of
        {ok, ok} ->
            Message = #chat_message{from = From, body = Body},
            broadcast_message(Message, Clients),
            NewHistory = [Message | lists:sublist(History, 49)],
            {noreply, State#chat_room_state{history = NewHistory}};
        _ ->
            {noreply, State}
    end;
handle_cast(_Message, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVersion, State, _Extra) ->
    {ok, State}.

broadcast_message(#chat_message{from = From, body = Body}, Clients) ->
    Payload = io_lib:format("[~s] ~s~n", [binary_to_list(From), binary_to_list(Body)]),
    notice_all(Payload, Clients).

notice_all(Payload, Clients) ->
    maps:foreach(
        fun(_Nickname, Client) ->
            notify_client(Client, Payload)
        end,
        Clients
    ).

notify_client(#chat_client{socket = undefined, pid = Pid}, Payload) ->
    Pid ! {chat_notice, iolist_to_binary(Payload)};
notify_client(#chat_client{socket = Socket}, Payload) ->
    gen_tcp:send(Socket, Payload).

validate_nickname(Nickname) when is_binary(Nickname), byte_size(Nickname) > 0 ->
    ok;
validate_nickname(_Nickname) ->
    {error, invalid_nickname}.

validate_body(Body) when is_binary(Body), byte_size(Body) > 0 ->
    ok;
validate_body(_Body) ->
    {error, invalid_body}.

room_broadcast_test() ->
    {ok, Pid} = start_link(),
    try
        ?assertMatch({ok, _}, join(<<"alice">>, undefined, self())),
        ?assertEqual({chat_notice, <<"[system] alice joined the room\n">>}, receive_notice()),
        ?assertMatch({ok, _}, join(<<"bob">>, undefined, self())),
        ?assertEqual({chat_notice, <<"[system] bob joined the room\n">>}, receive_notice()),
        publish(<<"alice">>, <<"hello">>),
        ?assertEqual({chat_notice, <<"[alice] hello\n">>}, receive_notice()),
        History = history(),
        ?assertEqual(1, length(History))
    after
        gen_server:stop(Pid)
    end.

invalid_nickname_test() ->
    {ok, Pid} = start_link(),
    try
        ?assertEqual({error, invalid_nickname}, join(<<>>, undefined, self())),
        publish(<<>>, <<"hello">>),
        ?assertEqual([], history())
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
