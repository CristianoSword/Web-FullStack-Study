-module(tcp_chat_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    RoomWorker = #{
        id => tcp_chat_room,
        start => {tcp_chat_room, start_link, []},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [tcp_chat_room]
    },
    {ok, {{one_for_one, 5, 10}, [RoomWorker]}}.
