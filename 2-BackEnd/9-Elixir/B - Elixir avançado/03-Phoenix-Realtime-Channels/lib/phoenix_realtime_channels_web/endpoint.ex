defmodule PhoenixRealtimeChannelsWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :phoenix_realtime_channels

  socket "/socket", PhoenixRealtimeChannelsWeb.UserSocket,
    websocket: true,
    longpoll: false

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]
  plug Plug.Parsers, parsers: [:json], pass: ["application/json"], json_decoder: Jason
  plug Plug.MethodOverride
  plug Plug.Head
  plug PhoenixRealtimeChannelsWeb.Router
end
