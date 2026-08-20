-module(tcp_chat_types).

-export_type([
    chat_client/0,
    chat_message/0,
    chat_room_state/0
]).

-include("tcp_chat.hrl").

-type chat_client() :: #chat_client{}.
-type chat_message() :: #chat_message{}.
-type chat_room_state() :: #chat_room_state{}.
