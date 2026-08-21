-module(tcp_chat_session).

-export([start/1]).

start(Socket) ->
    spawn_link(fun() -> init(Socket) end).

init(Socket) ->
    ok = gen_tcp:send(Socket, <<"Enter nickname:\n">>),
    case gen_tcp:recv(Socket, 0) of
        {ok, NicknameLine} ->
            Nickname = trim_line(NicknameLine),
            case validate_nickname(Nickname) of
                ok ->
                    join_room(Socket, Nickname);
                {error, invalid_nickname} ->
                    gen_tcp:send(Socket, <<"Invalid nickname\n">>),
                    gen_tcp:close(Socket)
            end;
        {error, _Reason} ->
            gen_tcp:close(Socket)
    end.

join_room(Socket, Nickname) ->
    case tcp_chat_room:join(Nickname, Socket, self()) of
                {ok, _Client} ->
                    ok = gen_tcp:send(Socket, <<"Welcome to the Erlang TCP chat\n">>),
                    session_loop(Socket, Nickname);
                {error, nickname_taken} ->
                    gen_tcp:send(Socket, <<"Nickname already in use\n">>),
                    gen_tcp:close(Socket)
    end.

session_loop(Socket, Nickname) ->
    case gen_tcp:recv(Socket, 0) of
        {ok, Data} ->
            Body = trim_line(Data),
            case Body of
                <<"/quit">> ->
                    tcp_chat_room:leave(Nickname),
                    gen_tcp:close(Socket);
                <<>> ->
                    session_loop(Socket, Nickname);
                _ ->
                    tcp_chat_room:publish(Nickname, Body),
                    session_loop(Socket, Nickname)
            end;
        {error, closed} ->
            tcp_chat_room:leave(Nickname),
            ok;
        {error, _Reason} ->
            tcp_chat_room:leave(Nickname),
            gen_tcp:close(Socket)
    end.

trim_line(Line) ->
    binary:replace(binary:replace(Line, <<"\r">>, <<>>, [global]), <<"\n">>, <<>>, [global]).

validate_nickname(Nickname) when is_binary(Nickname), byte_size(Nickname) > 0 ->
    ok;
validate_nickname(_Nickname) ->
    {error, invalid_nickname}.
