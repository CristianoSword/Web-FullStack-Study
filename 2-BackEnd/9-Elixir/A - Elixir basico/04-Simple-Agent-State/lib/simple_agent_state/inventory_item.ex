defmodule SimpleAgentState.InventoryItem do
  @enforce_keys [:name, :quantity]
  defstruct [:name, :quantity]
end
