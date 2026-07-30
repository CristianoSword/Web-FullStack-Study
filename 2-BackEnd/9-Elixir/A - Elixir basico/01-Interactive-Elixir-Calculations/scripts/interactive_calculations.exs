base = Path.expand("../lib/interactive_calculations", __DIR__)

Code.require_file(Path.join(base, "calculation_request.ex"))
Code.require_file(Path.join(base, "calculation_result.ex"))
Code.require_file(Path.join(base, "calculator.ex"))

alias InteractiveCalculations.CalculationRequest
alias InteractiveCalculations.Calculator

parse_number = fn input -> String.to_float(input) end

build_request = fn
  [operation, left, right] ->
    %CalculationRequest{
      operation: String.to_atom(operation),
      left: parse_number.(left),
      right: parse_number.(right)
    }

  _ ->
    raise """
    Usage:
      elixir scripts/interactive_calculations.exs add 10 5
      elixir scripts/interactive_calculations.exs divide 100 4
      elixir scripts/interactive_calculations.exs percentage 200 15
    """
end

request =
  System.argv()
  |> build_request.()

result = Calculator.execute(request)

IO.puts("#{result.summary} = #{result.value}")
