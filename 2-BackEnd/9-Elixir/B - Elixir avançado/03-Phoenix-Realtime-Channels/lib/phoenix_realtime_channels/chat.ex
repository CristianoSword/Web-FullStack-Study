defmodule PhoenixRealtimeChannels.Chat do
  alias PhoenixRealtimeChannels.{ChatMessage, ChatStore, PresenceSession, Validator}

  def join_room(room, user_id, display_name) do
    with :ok <- Validator.validate_room(room),
         :ok <- Validator.validate_presence_user(user_id, display_name) do
      session = %PresenceSession{
        room: room,
        user_id: user_id,
        display_name: display_name,
        joined_at: DateTime.utc_now()
      }

      ChatStore.join_presence(room, session)
    end
  end

  def leave_room(room, user_id) do
    ChatStore.leave_presence(room, user_id)
  end

  def post_message(room, author, body) do
    with :ok <- Validator.validate_room(room),
         :ok <- Validator.validate_presence_user(author, author),
         :ok <- Validator.validate_message_body(body) do
      message = %ChatMessage{
        id: "msg-" <> Integer.to_string(System.unique_integer([:positive])),
        room: room,
        author: author,
        body: String.trim(body),
        inserted_at: DateTime.utc_now()
      }

      ChatStore.store_message(room, message)
    end
  end

  def room_summary(room) do
    with :ok <- Validator.validate_room(room) do
      {:ok, ChatStore.room_summary(room)}
    end
  end
end
