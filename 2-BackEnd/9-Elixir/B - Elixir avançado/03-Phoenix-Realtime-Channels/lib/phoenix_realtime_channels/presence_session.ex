defmodule PhoenixRealtimeChannels.PresenceSession do
  @enforce_keys [:room, :user_id]
  defstruct room: nil,
            user_id: nil,
            display_name: nil,
            joined_at: nil
end
