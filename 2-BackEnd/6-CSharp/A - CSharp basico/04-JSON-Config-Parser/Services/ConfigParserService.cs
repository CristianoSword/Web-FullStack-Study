using System.Text.Json.Nodes;
using Study.CSharp.JsonConfigParser.Contracts;
using Study.CSharp.JsonConfigParser.Models;

namespace Study.CSharp.JsonConfigParser.Services;

public sealed class ConfigParserService
{
    private readonly IConfigurationStore _store;
    private readonly ConfigurationNavigator _navigator;
    private ParsedConfiguration? _current;

    public ConfigParserService(IConfigurationStore store, ConfigurationNavigator navigator)
    {
        _store = store;
        _navigator = navigator;
    }

    public ParsedConfiguration Load()
    {
        _current = _store.Load();
        return _current;
    }

    public ParsedConfiguration Current()
    {
        return _current ?? Load();
    }

    public string GetValue(string path)
    {
        var current = Current();
        var normalizedPath = _navigator.NormalizePath(path);
        var node = _navigator.GetNode(current.MergedJson, normalizedPath);
        return node.ToJsonString(new() { WriteIndented = true });
    }

    public ParsedConfiguration SetValue(ConfigMutation mutation)
    {
        var current = Current();
        var normalizedPath = _navigator.NormalizePath(mutation.Path);
        JsonNode valueNode = _navigator.ParseScalar(mutation.RawValue);
        _navigator.SetNode(current.BaseJson, normalizedPath, valueNode);
        _store.Save(current);
        _current = _store.Load();
        return _current;
    }
}
