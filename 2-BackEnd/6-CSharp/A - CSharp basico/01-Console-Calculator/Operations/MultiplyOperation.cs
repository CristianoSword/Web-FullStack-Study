using Study.CSharp.ConsoleCalculator.Contracts;
using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Operations;

public sealed class MultiplyOperation : IOperation
{
    public OperationKind Kind => OperationKind.Multiply;
    public string Symbol => "*";

    public decimal Execute(decimal left, decimal right) => left * right;
}
