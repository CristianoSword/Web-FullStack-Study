defmodule PhoenixRealtimeChannelsWeb.ErrorJSON do
  def render("404.json", _assigns), do: %{error: "not_found"}
  def render("500.json", _assigns), do: %{error: "internal_server_error"}
  def render(_template, _assigns), do: %{error: "unexpected_error"}
end
