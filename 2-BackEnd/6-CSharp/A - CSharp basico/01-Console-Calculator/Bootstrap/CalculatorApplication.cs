namespace Study.CSharp.ConsoleCalculator.Bootstrap;

public sealed class CalculatorApplication
{
    public Configuration.CalculatorSettings Settings { get; }
    public Services.ExpressionParser Parser { get; }
    public Services.CalculatorEngine Engine { get; }

    private CalculatorApplication(
        Configuration.CalculatorSettings settings,
        Services.ExpressionParser parser,
        Services.CalculatorEngine engine)
    {
        Settings = settings;
        Parser = parser;
        Engine = engine;
    }

    public static CalculatorApplication CreateDefault()
    {
        var settings = new Configuration.CalculatorSettings();
        var registry = new Services.OperationRegistry(
        [
            new Operations.AddOperation(),
            new Operations.SubtractOperation(),
            new Operations.MultiplyOperation(),
            new Operations.DivideOperation(),
        ]);
        var history = new Services.CalculationHistory(settings.HistoryCapacity);

        return new CalculatorApplication(
            settings,
            new Services.ExpressionParser(settings.Culture),
            new Services.CalculatorEngine(registry, history));
    }

    public void Run()
    {
        Console.WriteLine("Console Calculator bootstrap complete.");
        Console.WriteLine($"Configured culture: {Settings.Culture}");
        Console.WriteLine("Core services loaded: parser, operations and history.");
    }
}
