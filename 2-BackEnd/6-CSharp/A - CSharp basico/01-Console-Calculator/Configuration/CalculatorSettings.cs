namespace Study.CSharp.ConsoleCalculator.Configuration;

public sealed class CalculatorSettings
{
    public string Culture { get; init; } = "en-US";
    public int HistoryCapacity { get; init; } = 20;
    public int Precision { get; init; } = 2;
}
