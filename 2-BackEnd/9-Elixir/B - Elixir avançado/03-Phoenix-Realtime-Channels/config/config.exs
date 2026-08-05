import Config

config :phoenix_realtime_channels,
  ecto_repos: []

config :phoenix_realtime_channels, PhoenixRealtimeChannelsWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [formats: [json: PhoenixRealtimeChannelsWeb.ErrorJSON], layout: false],
  pubsub_server: PhoenixRealtimeChannels.PubSub,
  live_view: [signing_salt: "phoenixsalt"]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]
