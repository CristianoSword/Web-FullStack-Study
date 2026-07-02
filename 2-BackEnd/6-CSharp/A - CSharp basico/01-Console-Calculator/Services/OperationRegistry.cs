using Study.CSharp.ConsoleCalculator.Contracts;
using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Services;

public sealed class OperationRegistry
{
    private readonly Dictionary<OperationKind, IOperation> _operations;

    public OperationRegistry(IEnumerable<IOperation> operations)
    {
        _operations = operations.ToDictionary(operation => operation.Kind);
    }

    public IOperation Resolve(OperationKind operationKind)
    {
        if (_operations.TryGetValue(operationKind, out var operation))
        {
            return operation;
        }

        throw new InvalidOperationException($"Operation {operationKind} is not registered.");
    }
}
