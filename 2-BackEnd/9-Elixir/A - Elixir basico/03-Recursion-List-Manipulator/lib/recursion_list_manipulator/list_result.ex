defmodule RecursionListManipulator.ListResult do
  @enforce_keys [:operation, :result]
  defstruct [:operation, :result, summary: ""]
end
