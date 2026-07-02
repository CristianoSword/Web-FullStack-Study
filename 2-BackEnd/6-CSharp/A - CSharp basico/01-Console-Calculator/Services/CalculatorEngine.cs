using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Services;

public sealed class CalculatorEngine
{
    private readonly OperationRegistry _operationRegistry;
    private readonly CalculationHistory _history;

    public CalculatorEngine(OperationRegistry operationRegistry, CalculationHistory history)
    {
        _operationRegistry = operationRegistry;
        _history = history;
    }

    public CalculationResult Calculate(CalculationRequest request)
    {
        var operation = _operationRegistry.Resolve(request.Operation);
        var value = operation.Execute(request.LeftOperand, request.RightOperand);
        var result = new CalculationResult(
            request.LeftOperand,
            request.RightOperand,
            request.Operation,
            value,
            DateTimeOffset.UtcNow);

        _history.Add(result);
        return result;
    }

    public IReadOnlyCollection<CalculationResult> GetHistory()
    {
        return _history.List();
    }
}
