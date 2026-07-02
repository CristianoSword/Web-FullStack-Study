namespace Study.CSharp.ConsoleCalculator.Models;

public sealed record CalculationResult(
    decimal LeftOperand,
    decimal RightOperand,
    OperationKind Operation,
    decimal Value,
    DateTimeOffset CalculatedAt);
