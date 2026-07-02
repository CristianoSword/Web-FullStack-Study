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

        var left = decimal.Parse(tokens[0], _cultureInfo);
        var operation = tokens[1] switch
        {
            "+" => OperationKind.Add,
            "-" => OperationKind.Subtract,
            "*" => OperationKind.Multiply,
            "/" => OperationKind.Divide,
            _ => throw new InvalidOperationException("Supported operators: +, -, *, /."),
        };
        var right = decimal.Parse(tokens[2], _cultureInfo);

        return new CalculationRequest(left, right, operation);
    }
}
