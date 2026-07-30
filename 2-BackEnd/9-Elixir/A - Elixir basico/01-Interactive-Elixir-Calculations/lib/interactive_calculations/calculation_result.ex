defmodule InteractiveCalculations.CalculationResult do
  @enforce_keys [:operation, :value]
  defstruct [:operation, :value, summary: "", metadata: %{}]
end
