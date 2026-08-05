defmodule PhoenixRealtimeChannels.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Phoenix.PubSub, name: PhoenixRealtimeChannels.PubSub},
      PhoenixRealtimeChannelsWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: PhoenixRealtimeChannels.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    PhoenixRealtimeChannelsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
