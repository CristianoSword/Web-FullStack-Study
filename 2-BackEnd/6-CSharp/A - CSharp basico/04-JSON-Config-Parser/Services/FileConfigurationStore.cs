using System.Text.Json;
using System.Text.Json.Nodes;
using Study.CSharp.JsonConfigParser.Contracts;
using Study.CSharp.JsonConfigParser.Models;

namespace Study.CSharp.JsonConfigParser.Services;

public sealed class FileConfigurationStore : IConfigurationStore
{
    private readonly ConfigurationFileSet _files;
    private readonly IJsonConfigurationMerger _merger;
    private readonly ConfigurationBinder _binder;

    public FileConfigurationStore(
        ConfigurationFileSet files,
        IJsonConfigurationMerger merger,
        ConfigurationBinder binder)
    {
        _files = files;
        _merger = merger;
        _binder = binder;
    }

    public ParsedConfiguration Load()
    {
        var baseJson = LoadJsonObject(_files.BasePath);
        var overrideJson = File.Exists(_files.OverridePath)
            ? LoadJsonObject(_files.OverridePath!)
            : null;
        var mergedJson = overrideJson is null
            ? (JsonObject)baseJson.DeepClone()
            : _merger.Merge((JsonObject)baseJson.DeepClone(), overrideJson);
        var app = _binder.Bind(mergedJson);

        return new ParsedConfiguration(_files, baseJson, overrideJson, mergedJson, app);
    }

    public void Save(ParsedConfiguration configuration)
    {
        var options = new JsonSerializerOptions { WriteIndented = true };
        File.WriteAllText(_files.BasePath, configuration.BaseJson.ToJsonString(options));
    }

    private static JsonObject LoadJsonObject(string path)
    {
        if (!File.Exists(path))
        {
            throw new FileNotFoundException($"Configuration file '{path}' was not found.");
        }

        var node = JsonNode.Parse(File.ReadAllText(path));
        if (node is not JsonObject jsonObject)
        {
            throw new InvalidOperationException($"Configuration file '{path}' must contain a JSON object.");
        }

        return jsonObject;
    }

}
