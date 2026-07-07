namespace Study.CSharp.JsonConfigParser.Models;

public sealed record ApplicationConfig(
    string Name,
    string Environment,
    ServerOptions Server,
    DatabaseOptions Database,
    CacheOptions Cache,
    FeatureFlags FeatureFlags);
