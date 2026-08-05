defmodule PhoenixRealtimeChannelsWeb.PageController do
  use PhoenixRealtimeChannelsWeb, :controller

  alias PhoenixRealtimeChannels.Chat

  def health(conn, _params) do
    json(conn, %{status: "ok", service: "phoenix-realtime-channels"})
  end

  def room(conn, %{"room" => room}) do
    case Chat.room_summary(room) do
      {:ok, summary} ->
        json(conn, %{
          room: summary.room,
          message_count: summary.message_count,
          online_users: Enum.map(summary.online_users, & &1.display_name)
        })

      {:error, reason} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: Atom.to_string(reason)})
    end
  end
end
