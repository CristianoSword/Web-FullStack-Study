defmodule InteractiveCalculations.InputValidator do
  @supported_operations [:add, :subtract, :multiply, :divide, :percentage, :average]

  def validate_operation!(operation) when operation in @supported_operations, do: operation

  def validate_operation!(operation) do
    raise ArgumentError, "Unsupported operation: #{inspect(operation)}"
  end

  def validate_number!(value) when is_number(value), do: value

  def validate_number!(value) do
    raise ArgumentError, "Expected a numeric value, got: #{inspect(value)}"
  end

  def validate_divisor!(0.0), do: raise(ArgumentError, "Division by zero is not allowed.")
  def validate_divisor!(0), do: raise(ArgumentError, "Division by zero is not allowed.")
  def validate_divisor!(value), do: value
end
