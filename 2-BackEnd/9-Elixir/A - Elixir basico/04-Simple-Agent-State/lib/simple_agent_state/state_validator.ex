defmodule SimpleAgentState.StateValidator do
  def validate_item_name!(name) when is_binary(name) and byte_size(name) > 0, do: name

  def validate_item_name!(name) do
    raise ArgumentError, "Item name must be a non-empty binary, got: #{inspect(name)}"
  end

  def validate_quantity!(quantity) when is_integer(quantity) and quantity >= 0, do: quantity

  def validate_quantity!(quantity) do
    raise ArgumentError, "Quantity must be a non-negative integer, got: #{inspect(quantity)}"
  end
end
