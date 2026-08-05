defmodule PhoenixRealtimeChannelsWeb.UserSocket do
  use Phoenix.Socket

  channel "room:*", PhoenixRealtimeChannelsWeb.RoomChannel

  def connect(_params, socket, _connect_info), do: {:ok, socket}
  def id(_socket), do: nil
end
