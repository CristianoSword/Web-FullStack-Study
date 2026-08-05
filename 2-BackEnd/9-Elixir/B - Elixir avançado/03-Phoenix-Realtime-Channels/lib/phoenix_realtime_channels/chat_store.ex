defmodule PhoenixRealtimeChannels.ChatStore do
  use GenServer

  alias PhoenixRealtimeChannels.{ChatMessage, PresenceSession, RoomSummary}

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def join_presence(room, %PresenceSession{} = session) do
    GenServer.call(__MODULE__, {:join_presence, room, session})
  end

  def leave_presence(room, user_id) do
    GenServer.call(__MODULE__, {:leave_presence, room, user_id})
  end

  def store_message(room, %ChatMessage{} = message) do
    GenServer.call(__MODULE__, {:store_message, room, message})
  end

  def room_summary(room) do
    GenServer.call(__MODULE__, {:room_summary, room})
  end

  @impl true
  def init(state), do: {:ok, state}

  @impl true
  def handle_call({:join_presence, room, session}, _from, state) do
    room_state = ensure_room(state, room)
    updated_presence = Map.put(room_state.presence, session.user_id, session)
    updated_state = put_room_state(state, room, %{room_state | presence: updated_presence})

    {:reply, {:ok, session}, updated_state}
  end

  def handle_call({:leave_presence, room, user_id}, _from, state) do
    room_state = ensure_room(state, room)
    updated_presence = Map.delete(room_state.presence, user_id)
    updated_state = put_room_state(state, room, %{room_state | presence: updated_presence})

    {:reply, :ok, updated_state}
  end

  def handle_call({:store_message, room, message}, _from, state) do
    room_state = ensure_room(state, room)
    updated_messages = Enum.take(room_state.messages ++ [message], -20)
    updated_state = put_room_state(state, room, %{room_state | messages: updated_messages})

    {:reply, {:ok, message}, updated_state}
  end

  def handle_call({:room_summary, room}, _from, state) do
    room_state = ensure_room(state, room)

    summary = %RoomSummary{
      room: room,
      online_users: Map.values(room_state.presence),
      message_count: length(room_state.messages),
      recent_messages: room_state.messages
    }

    {:reply, summary, state}
  end

  defp ensure_room(state, room) do
    Map.get(state, room, %{messages: [], presence: %{}})
  end

  defp put_room_state(state, room, room_state) do
    Map.put(state, room, room_state)
  end
end
