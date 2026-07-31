defmodule PatternMatchingBasics.PayloadBuilder do
  alias PatternMatchingBasics.MatchPayload

  @supported_kinds [:tuple, :list, :map, :binary]

  def build!(kind, value) when kind in @supported_kinds do
    validate_shape!(kind, value)
    %MatchPayload{kind: kind, value: value}
  end

  def build!(kind, _value) do
    raise ArgumentError, "Unsupported payload kind: #{inspect(kind)}"
  end

  defp validate_shape!(:tuple, value) when is_tuple(value), do: value
  defp validate_shape!(:list, value) when is_list(value), do: value
  defp validate_shape!(:map, value) when is_map(value), do: value
  defp validate_shape!(:binary, value) when is_binary(value), do: value

  defp validate_shape!(kind, value) do
    raise ArgumentError,
          "Expected #{inspect(kind)} payload shape, got: #{inspect(value)}"
  end
end
