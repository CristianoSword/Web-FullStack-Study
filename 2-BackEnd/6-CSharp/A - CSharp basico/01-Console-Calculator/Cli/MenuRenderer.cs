using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Cli;

public static class MenuRenderer
{
    public static void PrintBanner()
    {
        Console.WriteLine("Console Calculator");
        Console.WriteLine("Type an expression like: 12.5 * 4");
        Console.WriteLine("Other commands: help, history, exit");
    }

    public static void PrintHelp()
    {
        Console.WriteLine("Accepted format: <left> <operator> <right>");
        Console.WriteLine("Supported operators: +, -, *, /");
    }

    public static void PrintResult(CalculationResult result)
    {
        Console.WriteLine($"{result.LeftOperand} {ToSymbol(result.Operation)} {result.RightOperand} = {result.Value}");
    }

    public static void PrintHistory(IReadOnlyCollection<CalculationResult> history)
    {
        if (history.Count == 0)
        {
            Console.WriteLine("No calculations recorded yet.");
            return;
        }

        foreach (var entry in history)
        {
            PrintResult(entry);
        }
    }

    private static string ToSymbol(OperationKind operation)
    {
        return operation switch
        {
            OperationKind.Add => "+",
            OperationKind.Subtract => "-",
            OperationKind.Multiply => "*",
            OperationKind.Divide => "/",
            _ => "?",
        };
    }
}
