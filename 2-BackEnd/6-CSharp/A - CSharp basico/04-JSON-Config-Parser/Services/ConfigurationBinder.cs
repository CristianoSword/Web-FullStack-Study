using System.Text.Json.Nodes;
using Study.CSharp.JsonConfigParser.Models;

namespace Study.CSharp.JsonConfigParser.Services;

public sealed class ConfigurationBinder
{
    public ApplicationConfig Bind(JsonObject root)
    {
        var appNode = root["App"]?.Deserialize<ApplicationConfig>();
        return appNode ?? throw new InvalidOperationException("The App configuration section is missing.");
    }
}
