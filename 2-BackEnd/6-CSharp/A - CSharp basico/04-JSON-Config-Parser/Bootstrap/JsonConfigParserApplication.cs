namespace Study.CSharp.JsonConfigParser.Bootstrap;

public sealed class JsonConfigParserApplication
{
    public Configuration.RuntimeSettings Settings { get; }

    private JsonConfigParserApplication(Configuration.RuntimeSettings settings)
    {
        Settings = settings;
    }

    public static JsonConfigParserApplication CreateDefault()
    {
        return new JsonConfigParserApplication(new Configuration.RuntimeSettings());
    }

    public void Run()
    {
        Console.WriteLine("JSON Config Parser bootstrapped.");
        Console.WriteLine($"Environment: {Settings.EnvironmentName}");
        Console.WriteLine($"Base file: {Settings.BaseFileName}");
        Console.WriteLine($"Override file: {Settings.OverrideFileName}");
    }
}
