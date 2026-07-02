using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Services;

public sealed class CalculationHistory
{
    private readonly Queue<CalculationResult> _entries = new();
    private readonly int _capacity;

    public CalculationHistory(int capacity)
    {
        _capacity = Math.Max(1, capacity);
    }

    public void Add(CalculationResult result)
    {
        if (_entries.Count == _capacity)
        {
            _entries.Dequeue();
        }

        _entries.Enqueue(result);
    }

    public IReadOnlyCollection<CalculationResult> List()
    {
        return _entries.ToArray();
    }
}
