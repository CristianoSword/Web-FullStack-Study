defmodule RecursionListManipulator.ListJob do
  @enforce_keys [:operation, :items]
  defstruct [:operation, :items]
end
