defmodule PhoenixRealtimeChannels.RoomSummary do
  @enforce_keys [:room]
  defstruct room: nil,
            online_users: [],
            message_count: 0,
            recent_messages: []
end
