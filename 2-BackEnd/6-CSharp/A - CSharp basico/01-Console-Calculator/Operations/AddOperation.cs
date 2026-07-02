using Study.CSharp.ConsoleCalculator.Contracts;
using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Operations;

public sealed class AddOperation : IOperation
{
    public OperationKind Kind => OperationKind.Add;
    public string Symbol => "+";

    public decimal Execute(decimal left, decimal right) => left + right;
}
