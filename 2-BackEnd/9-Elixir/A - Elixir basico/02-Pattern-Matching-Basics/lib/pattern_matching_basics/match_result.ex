defmodule PatternMatchingBasics.MatchResult do
  @enforce_keys [:label, :details]
  defstruct [:label, :details, captures: %{}]
end
