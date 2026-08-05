defmodule PhoenixRealtimeChannelsWeb.Router do
  use Phoenix.Router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PhoenixRealtimeChannelsWeb do
    pipe_through :api

    get "/health", PageController, :health
    get "/rooms/:room", PageController, :room
  end
end
