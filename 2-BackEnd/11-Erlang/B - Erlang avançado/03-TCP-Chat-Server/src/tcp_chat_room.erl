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
    case maps:is_key(Nickname, Clients) of
        true ->
            {reply, {error, nickname_taken}, State};
        false ->
            Client = #chat_client{nickname = Nickname, socket = Socket, pid = Pid},
            NewClients = Clients#{Nickname => Client},
            notice_all(io_lib:format("[system] ~s joined the room~n", [binary_to_list(Nickname)]), NewClients),
            {reply, {ok, Client}, State#chat_room_state{clients = NewClients}}
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
    Message = #chat_message{from = From, body = Body},
    broadcast_message(Message, Clients),
    NewHistory = [Message | lists:sublist(History, 49)],
    {noreply, State#chat_room_state{history = NewHistory}};
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
        fun(_Nickname, #chat_client{socket = Socket}) ->
            gen_tcp:send(Socket, Payload)
        end,
        Clients
    ).
