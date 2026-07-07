using System.Text.Json;
using System.Text.Json.Nodes;

namespace Study.CSharp.JsonConfigParser.Services;

public sealed class ConfigurationNavigator
{
    public string NormalizePath(string path)
    {
        var normalized = path.Trim();
        if (normalized.Length == 0)
        {
            throw new InvalidOperationException("Configuration paths cannot be empty.");
        }

        if (!normalized.StartsWith("App.", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(normalized, "App", StringComparison.OrdinalIgnoreCase))
        {
            normalized = $"App.{normalized}";
        }

        return normalized;
    }

    public JsonNode GetNode(JsonObject root, string path)
    {
        JsonNode? current = root;
        foreach (var segment in path.Split('.', StringSplitOptions.RemoveEmptyEntries))
        {
            current = current?[segment];
            if (current is null)
            {
                throw new InvalidOperationException($"Configuration path '{path}' was not found.");
            }
        }

        return current;
    }

    public void SetNode(JsonObject root, string path, JsonNode value)
    {
        var segments = path.Split('.', StringSplitOptions.RemoveEmptyEntries);
        JsonObject current = root;

        for (var index = 0; index < segments.Length - 1; index++)
        {
            var segment = segments[index];
            if (current[segment] is not JsonObject child)
            {
                child = new JsonObject();
                current[segment] = child;
            }

            current = child;
        }

        current[segments[^1]] = value;
    }

    public JsonNode ParseScalar(string rawValue)
    {
        if (string.Equals(rawValue, "null", StringComparison.OrdinalIgnoreCase))
        {
            return null!;
        }

        if (bool.TryParse(rawValue, out var boolValue))
        {
            return JsonValue.Create(boolValue)!;
        }

        if (int.TryParse(rawValue, out var intValue))
        {
            return JsonValue.Create(intValue)!;
        }

        if (double.TryParse(rawValue, out var doubleValue))
        {
            return JsonValue.Create(doubleValue)!;
        }

        if ((rawValue.StartsWith("{") && rawValue.EndsWith("}")) ||
            (rawValue.StartsWith("[") && rawValue.EndsWith("]")))
        {
            return JsonNode.Parse(rawValue)
                ?? throw new InvalidOperationException("The provided JSON payload could not be parsed.");
        }

        return JsonValue.Create(rawValue)!;
    }
}
