using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Validation;

public static class CalculationRequestValidator
{
    public static void Validate(CalculationRequest request)
    {
        if (request.Operation == OperationKind.Divide && request.RightOperand == 0)
        {
            throw new InvalidOperationException("Division by zero is not allowed.");
        }
    }
}
