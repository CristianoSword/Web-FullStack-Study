defmodule SimpleAgentState.StateSnapshot do
  @enforce_keys [:counter, :items]
  defstruct [:counter, :items]
end
