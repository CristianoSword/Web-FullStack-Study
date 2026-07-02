using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Contracts;

public interface IOperation
{
    OperationKind Kind { get; }
    string Symbol { get; }
    decimal Execute(decimal left, decimal right);
}
