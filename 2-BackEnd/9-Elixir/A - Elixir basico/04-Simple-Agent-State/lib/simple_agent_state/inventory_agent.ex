defmodule SimpleAgentState.InventoryAgent do
  alias SimpleAgentState.InventoryItem
  alias SimpleAgentState.StateValidator
  alias SimpleAgentState.StateSnapshot

  def start_link(initial_state \\ default_state()) do
    case Process.whereis(__MODULE__) do
      nil -> Agent.start_link(fn -> initial_state end, name: __MODULE__)
      pid -> {:ok, pid}
    end
  end

  def increment_counter do
    Agent.update(__MODULE__, fn state ->
      Map.update!(state, :counter, &(&1 + 1))
    end)
  end

  def put_item(name, quantity) do
    StateValidator.validate_item_name!(name)
    StateValidator.validate_quantity!(quantity)

    Agent.update(__MODULE__, fn state ->
      item = %InventoryItem{name: name, quantity: quantity}
      Map.put(state, :items, upsert_item(state.items, item))
    end)
  end

  def snapshot do
    Agent.get(__MODULE__, fn state ->
      %StateSnapshot{
        counter: state.counter,
        items: state.items
      }
    end)
  end

  def default_state do
    %{
      counter: 0,
      items: []
    }
  end

  defp upsert_item([], item), do: [item]

  defp upsert_item([%InventoryItem{name: name} | tail], %InventoryItem{name: name} = item) do
    [item | tail]
  end

  defp upsert_item([head | tail], item), do: [head | upsert_item(tail, item)]
end
