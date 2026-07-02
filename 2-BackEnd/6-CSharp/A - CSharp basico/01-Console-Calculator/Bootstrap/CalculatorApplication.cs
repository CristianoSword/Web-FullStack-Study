namespace Study.CSharp.ConsoleCalculator.Bootstrap;

public sealed class CalculatorApplication
{
    public Configuration.CalculatorSettings Settings { get; }

    private CalculatorApplication(Configuration.CalculatorSettings settings)
    {
        Settings = settings;
    }

    public static CalculatorApplication CreateDefault()
    {
        return new CalculatorApplication(new Configuration.CalculatorSettings());
    }

    public void Run()
    {
        Console.WriteLine("Console Calculator bootstrap complete.");
        Console.WriteLine($"Configured culture: {Settings.Culture}");
    }
}
