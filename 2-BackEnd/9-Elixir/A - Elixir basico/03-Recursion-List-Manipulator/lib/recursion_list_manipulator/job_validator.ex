defmodule RecursionListManipulator.JobValidator do
  @supported_operations [:sum, :count, :reverse, :double, :evens]

  def validate_operation!(operation) when operation in @supported_operations, do: operation

  def validate_operation!(operation) do
    raise ArgumentError, "Unsupported recursive operation: #{inspect(operation)}"
  end

  def validate_items!(items) when is_list(items) do
    ensure_numeric_list!(items)
    items
  end

  def validate_items!(items) do
    raise ArgumentError, "Expected a list of numeric items, got: #{inspect(items)}"
  end

  defp ensure_numeric_list!([]), do: :ok

  defp ensure_numeric_list!([head | tail]) when is_number(head) do
    ensure_numeric_list!(tail)
  end

  defp ensure_numeric_list!(items) do
    raise ArgumentError, "List contains non-numeric values: #{inspect(items)}"
  end
end
