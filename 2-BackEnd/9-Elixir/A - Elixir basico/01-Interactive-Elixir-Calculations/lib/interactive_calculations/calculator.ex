defmodule InteractiveCalculations.Calculator do
  alias InteractiveCalculations.CalculationRequest
  alias InteractiveCalculations.CalculationResult
  alias InteractiveCalculations.InputValidator

  def execute(%CalculationRequest{operation: :add, left: left, right: right}) do
    InputValidator.validate_number!(left)
    InputValidator.validate_number!(right)
    build_result(:add, left + right, "#{left} + #{right}")
  end

  def execute(%CalculationRequest{operation: :subtract, left: left, right: right}) do
    InputValidator.validate_number!(left)
    InputValidator.validate_number!(right)
    build_result(:subtract, left - right, "#{left} - #{right}")
  end

  def execute(%CalculationRequest{operation: :multiply, left: left, right: right}) do
    InputValidator.validate_number!(left)
    InputValidator.validate_number!(right)
    build_result(:multiply, left * right, "#{left} * #{right}")
  end

  def execute(%CalculationRequest{operation: :divide, left: left, right: right}) do
    InputValidator.validate_number!(left)
    InputValidator.validate_number!(right)
    InputValidator.validate_divisor!(right)
    build_result(:divide, left / right, "#{left} / #{right}")
  end

  def execute(%CalculationRequest{operation: :percentage, left: left, right: right}) do
    InputValidator.validate_number!(left)
    InputValidator.validate_number!(right)
    build_result(:percentage, left * (right / 100), "#{right}% of #{left}")
  end

  def execute(%CalculationRequest{operation: :average, left: left, right: right}) do
    InputValidator.validate_number!(left)
    InputValidator.validate_number!(right)
    build_result(:average, (left + right) / 2, "average of #{left} and #{right}")
  end

  def execute(%CalculationRequest{operation: operation}) do
    InputValidator.validate_operation!(operation)
  end

  defp build_result(operation, value, summary) do
    %CalculationResult{
      operation: operation,
      value: value,
      summary: summary
    }
  end
end
