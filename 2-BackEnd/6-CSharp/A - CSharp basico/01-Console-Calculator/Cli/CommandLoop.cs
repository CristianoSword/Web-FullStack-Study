using Study.CSharp.ConsoleCalculator.Models;
using Study.CSharp.ConsoleCalculator.Services;

namespace Study.CSharp.ConsoleCalculator.Cli;

public sealed class CommandLoop
{
    private readonly ExpressionParser _parser;
    private readonly CalculatorEngine _engine;

    public CommandLoop(ExpressionParser parser, CalculatorEngine engine)
    {
        _parser = parser;
        _engine = engine;
    }

    public void Run()
    {
        var running = true;

        while (running)
        {
            Console.Write("> ");
            var input = Console.ReadLine()?.Trim() ?? string.Empty;

            if (string.Equals(input, "exit", StringComparison.OrdinalIgnoreCase))
            {
                running = false;
                continue;
            }

            if (string.Equals(input, "help", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintHelp();
                continue;
            }

            if (string.Equals(input, "history", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintHistory(_engine.GetHistory());
                continue;
            }

            if (string.IsNullOrWhiteSpace(input))
            {
                continue;
            }

            var request = _parser.Parse(input);
            var result = _engine.Calculate(request);
            MenuRenderer.PrintResult(result);
        }
    }
}
