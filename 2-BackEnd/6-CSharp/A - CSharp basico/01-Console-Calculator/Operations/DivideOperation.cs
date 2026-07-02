using Study.CSharp.ConsoleCalculator.Contracts;
using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Operations;

public sealed class DivideOperation : IOperation
{
    public OperationKind Kind => OperationKind.Divide;
    public string Symbol => "/";

    public decimal Execute(decimal left, decimal right) => left / right;
}
