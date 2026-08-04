defmodule OtpGenServerProcess.GameServer do
  use GenServer

  alias OtpGenServerProcess.{Engine, Move, Player}

  def start_link(opts \\ []) do
    server_name = Keyword.get(opts, :name, __MODULE__)
    GenServer.start_link(__MODULE__, opts, name: server_name)
  end

  def join_player(server \\ __MODULE__, %Player{} = player) do
    GenServer.call(server, {:join_player, player})
  end

  def start_game(server \\ __MODULE__) do
    GenServer.call(server, :start_game)
  end

  def apply_move(server \\ __MODULE__, %Move{} = move) do
    GenServer.call(server, {:apply_move, move})
  end

  def snapshot(server \\ __MODULE__) do
    GenServer.call(server, :snapshot)
  end

  @impl true
  def init(opts) do
    game_id = Keyword.get(opts, :game_id, "arena-01")
    {:ok, Engine.new_game(game_id)}
  end

  @impl true
  def handle_call({:join_player, player}, _from, state) do
    case Engine.join_player(state, player) do
      {:ok, updated_state} -> {:reply, {:ok, updated_state}, updated_state}
      {:error, reason} -> {:reply, {:error, reason}, state}
    end
  end

  def handle_call(:start_game, _from, state) do
    case Engine.start_game(state) do
      {:ok, updated_state} -> {:reply, {:ok, updated_state}, updated_state}
      {:error, reason} -> {:reply, {:error, reason}, state}
    end
  end

  def handle_call({:apply_move, move}, _from, state) do
    case Engine.apply_move(state, move) do
      {:ok, updated_state} -> {:reply, {:ok, updated_state}, updated_state}
      {:error, reason} -> {:reply, {:error, reason}, state}
    end
  end

  def handle_call(:snapshot, _from, state), do: {:reply, state, state}
end
