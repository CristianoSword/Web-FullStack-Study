namespace Study.CSharp.ConsoleCalculator.Models;

public sealed record CalculationRequest(
    decimal LeftOperand,
    decimal RightOperand,
    OperationKind Operation);
