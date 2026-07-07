namespace Study.CSharp.JsonConfigParser.Models;

public sealed record ConfigurationFileSet(
    string BasePath,
    string? OverridePath,
    string EnvironmentName);
