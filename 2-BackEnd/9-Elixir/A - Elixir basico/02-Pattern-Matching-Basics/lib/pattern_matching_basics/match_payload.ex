defmodule PatternMatchingBasics.MatchPayload do
  @enforce_keys [:kind, :value]
  defstruct [:kind, :value, metadata: %{}]
end
