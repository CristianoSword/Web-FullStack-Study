defmodule PhoenixRealtimeChannels.Chat do
  alias PhoenixRealtimeChannels.{ChatMessage, ChatStore, PresenceSession}

  def join_room(room, user_id, display_name) do
    session = %PresenceSession{
      room: room,
      user_id: user_id,
      display_name: display_name,
      joined_at: DateTime.utc_now()
    }

    ChatStore.join_presence(room, session)
  end

  def leave_room(room, user_id) do
    ChatStore.leave_presence(room, user_id)
  end

  def post_message(room, author, body) do
    message = %ChatMessage{
      id: "msg-" <> Integer.to_string(System.unique_integer([:positive])),
      room: room,
      author: author,
      body: body,
      inserted_at: DateTime.utc_now()
    }

    ChatStore.store_message(room, message)
  end

  def room_summary(room), do: ChatStore.room_summary(room)
end
