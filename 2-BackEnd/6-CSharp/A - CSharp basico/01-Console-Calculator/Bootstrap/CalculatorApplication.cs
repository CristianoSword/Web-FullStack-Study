namespace Study.CSharp.ConsoleCalculator.Bootstrap;

public sealed class CalculatorApplication
{
    public static CalculatorApplication CreateDefault()
    {
        return new CalculatorApplication();
    }

    public void Run()
    {
        Console.WriteLine("Console Calculator bootstrap complete.");
        Console.WriteLine("Interactive commands will be wired in upcoming phases.");
    }
}
