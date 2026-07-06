namespace Study.CSharp.JsonConfigParser.Configuration;

public sealed class RuntimeSettings
{
    public string EnvironmentName { get; init; } = "Development";
    public string BaseFileName { get; init; } = "appsettings.json";
    public string OverrideFileName { get; init; } = "appsettings.Development.json";
}
