namespace Study.CSharp.ConsoleCalculator.Bootstrap;

public sealed class CalculatorApplication
{
    public Configuration.CalculatorSettings Settings { get; }
    public Services.ExpressionParser Parser { get; }
    public Services.CalculatorEngine Engine { get; }
    public Cli.CommandLoop ConsoleLoop { get; }

    private CalculatorApplication(
        Configuration.CalculatorSettings settings,
        Services.ExpressionParser parser,
        Services.CalculatorEngine engine,
        Cli.CommandLoop consoleLoop)
    {
        Settings = settings;
        Parser = parser;
        Engine = engine;
        ConsoleLoop = consoleLoop;
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

        var parser = new Services.ExpressionParser(settings.Culture);
        var engine = new Services.CalculatorEngine(registry, history);

        return new CalculatorApplication(
            settings,
            parser,
            engine,
            new Cli.CommandLoop(parser, engine));
    }

    public void Run()
    {
        Cli.MenuRenderer.PrintBanner();
        Console.WriteLine($"Configured culture: {Settings.Culture}");
        ConsoleLoop.Run();
    }
}
