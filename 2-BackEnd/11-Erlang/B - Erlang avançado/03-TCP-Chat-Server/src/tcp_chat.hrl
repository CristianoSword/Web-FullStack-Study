-record(chat_client, {
    nickname,
    socket,
    pid
}).

-record(chat_message, {
    from,
    body
}).

-record(chat_room_state, {
    clients = #{},
    history = []
}).
