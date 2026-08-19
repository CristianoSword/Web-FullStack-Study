-record(chat_message, {
    from,
    to,
    body
}).

-record(peer_state, {
    name,
    inbox = []
}).

-record(conversation_summary, {
    sent = 0,
    delivered = 0,
    inbox = []
}).
