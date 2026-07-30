defmodule InteractiveCalculations.CalculationRequest do
  @enforce_keys [:operation, :left, :right]
  defstruct [:operation, :left, :right, metadata: %{}]
end
