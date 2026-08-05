defmodule PhoenixRealtimeChannelsWeb.RoomChannel do
  use PhoenixRealtimeChannelsWeb, :channel

  alias PhoenixRealtimeChannels.Chat

  def join("room:" <> room, %{"user_id" => user_id, "display_name" => display_name}, socket) do
    with {:ok, _session} <- Chat.join_room(room, user_id, display_name) do
      {:ok, summary} = Chat.room_summary(room)

      {:ok,
       socket
       |> assign(:room, room)
       |> assign(:user_id, user_id)
       |> assign(:display_name, display_name)
       |> assign(:summary, summary)}
    else
      {:error, reason} ->
        {:error, %{reason: Atom.to_string(reason)}}
    end
  end

  def handle_in("message:new", %{"body" => body}, socket) do
    room = socket.assigns.room
    author = socket.assigns.display_name

    with {:ok, message} <- Chat.post_message(room, author, body) do
      broadcast!(socket, "message:created", %{
        id: message.id,
        author: message.author,
        body: message.body,
        room: message.room
      })

      {:reply, {:ok, %{message_id: message.id}}, socket}
    else
      {:error, reason} ->
        {:reply, {:error, %{reason: Atom.to_string(reason)}}, socket}
    end
  end

  def handle_in("room:summary", _payload, socket) do
    case Chat.room_summary(socket.assigns.room) do
      {:ok, summary} -> {:reply, {:ok, summary_payload(summary)}, socket}
      {:error, reason} -> {:reply, {:error, %{reason: Atom.to_string(reason)}}, socket}
    end
  end

  def terminate(_reason, socket) do
    Chat.leave_room(socket.assigns.room, socket.assigns.user_id)
    :ok
  end

  defp summary_payload(summary) do
    %{
      room: summary.room,
      message_count: summary.message_count,
      online_users: Enum.map(summary.online_users, & &1.display_name)
    }
  end
end
