defmodule SupervisorTreeRecovery.RecoveryTracker do
  use GenServer

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def bump(worker_name) do
    GenServer.call(__MODULE__, {:bump, worker_name})
  end

  def count(worker_name) do
    GenServer.call(__MODULE__, {:count, worker_name})
  end

  @impl true
  def init(state), do: {:ok, state}

  @impl true
  def handle_call({:bump, worker_name}, _from, state) do
    next_count = Map.get(state, worker_name, 0) + 1
    {:reply, next_count, Map.put(state, worker_name, next_count)}
  end

  def handle_call({:count, worker_name}, _from, state) do
    {:reply, Map.get(state, worker_name, 0), state}
  end
end
