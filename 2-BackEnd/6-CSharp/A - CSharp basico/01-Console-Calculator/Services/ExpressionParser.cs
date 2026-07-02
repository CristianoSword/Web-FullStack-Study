using System.Globalization;
using Study.CSharp.ConsoleCalculator.Models;

namespace Study.CSharp.ConsoleCalculator.Services;

public sealed class ExpressionParser
{
    private readonly CultureInfo _cultureInfo;

    public ExpressionParser(string culture)
    {
        _cultureInfo = CultureInfo.GetCultureInfo(culture);
    }

    public CalculationRequest Parse(string input)
    {
        var tokens = input.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (tokens.Length != 3)
        {
            throw new InvalidOperationException("Use the format: <left> <operator> <right>.");
        }

        if (!decimal.TryParse(tokens[0], NumberStyles.Number, _cultureInfo, out var left))
        {
            throw new InvalidOperationException($"Invalid left operand: {tokens[0]}");
        }

        var operation = tokens[1] switch
        {
            "+" => OperationKind.Add,
            "-" => OperationKind.Subtract,
            "*" => OperationKind.Multiply,
            "/" => OperationKind.Divide,
            _ => throw new InvalidOperationException("Supported operators: +, -, *, /."),
        };

        if (!decimal.TryParse(tokens[2], NumberStyles.Number, _cultureInfo, out var right))
        {
            throw new InvalidOperationException($"Invalid right operand: {tokens[2]}");
        }

        return new CalculationRequest(left, right, operation);
    }
}
