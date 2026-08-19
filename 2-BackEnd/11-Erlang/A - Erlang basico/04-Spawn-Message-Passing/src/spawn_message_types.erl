-module(spawn_message_types).

-export_type([
    chat_message/0,
    peer_state/0,
    conversation_summary/0
]).

-include("spawn_message.hrl").

-type chat_message() :: #chat_message{}.
-type peer_state() :: #peer_state{}.
-type conversation_summary() :: #conversation_summary{}.
