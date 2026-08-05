defmodule PhoenixRealtimeChannels.ChatMessage do
  @enforce_keys [:id, :room, :author, :body]
  defstruct id: nil,
            room: nil,
            author: nil,
            body: nil,
            inserted_at: nil
end
