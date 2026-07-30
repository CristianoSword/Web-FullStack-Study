defmodule InteractiveCalculations.Calculator do
  alias InteractiveCalculations.CalculationRequest
  alias InteractiveCalculations.CalculationResult

  def execute(%CalculationRequest{operation: :add, left: left, right: right}) do
    build_result(:add, left + right, "#{left} + #{right}")
  end

  def execute(%CalculationRequest{operation: :subtract, left: left, right: right}) do
    build_result(:subtract, left - right, "#{left} - #{right}")
  end

  def execute(%CalculationRequest{operation: :multiply, left: left, right: right}) do
    build_result(:multiply, left * right, "#{left} * #{right}")
  end

  def execute(%CalculationRequest{operation: :divide, left: left, right: right}) do
    build_result(:divide, left / right, "#{left} / #{right}")
  end

  def execute(%CalculationRequest{operation: :percentage, left: left, right: right}) do
    build_result(:percentage, left * (right / 100), "#{right}% of #{left}")
  end

  def execute(%CalculationRequest{operation: :average, left: left, right: right}) do
    build_result(:average, (left + right) / 2, "average of #{left} and #{right}")
  end

  defp build_result(operation, value, summary) do
    %CalculationResult{
      operation: operation,
      value: value,
      summary: summary
    }
  end
end
