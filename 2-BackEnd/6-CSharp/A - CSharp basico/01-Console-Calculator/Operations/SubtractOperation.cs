using Study.CSharp.ConsoleCalculator.Contracts;
using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Operations;

public sealed class SubtractOperation : IOperation
{
    public OperationKind Kind => OperationKind.Subtract;
    public string Symbol => "-";

    public decimal Execute(decimal left, decimal right) => left - right;
}
