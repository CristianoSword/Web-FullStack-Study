using System.Text.Json.Nodes;
using Study.CSharp.JsonConfigParser.Contracts;
using Study.CSharp.JsonConfigParser.Models;
using Study.CSharp.JsonConfigParser.Validation;

namespace Study.CSharp.JsonConfigParser.Services;

public sealed class ConfigParserService
{
    private readonly IConfigurationStore _store;
    private readonly ConfigurationNavigator _navigator;
    private readonly ConfigurationValidator _validator;
    private readonly IJsonConfigurationMerger _merger;
    private readonly ConfigurationBinder _binder;
    private ParsedConfiguration? _current;

    public ConfigParserService(
        IConfigurationStore store,
        ConfigurationNavigator navigator,
        ConfigurationValidator validator,
        IJsonConfigurationMerger merger,
        ConfigurationBinder binder)
    {
        _store = store;
        _navigator = navigator;
        _validator = validator;
        _merger = merger;
        _binder = binder;
    }

    public ParsedConfiguration Load()
    {
        _current = _store.Load();
        _validator.ValidateConfiguration(_current);
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
        _validator.ValidateMutation(mutation);
        var normalizedPath = _navigator.NormalizePath(mutation.Path);
        JsonNode valueNode = _navigator.ParseScalar(mutation.RawValue);

        var updatedBaseJson = (JsonObject)current.BaseJson.DeepClone();
        _navigator.SetNode(updatedBaseJson, normalizedPath, valueNode);

        var updatedMergedJson = current.OverrideJson is null
            ? (JsonObject)updatedBaseJson.DeepClone()
            : _merger.Merge((JsonObject)updatedBaseJson.DeepClone(), (JsonObject)current.OverrideJson.DeepClone());
        var updatedConfiguration = new ParsedConfiguration(
            current.Files,
            updatedBaseJson,
            current.OverrideJson is null ? null : (JsonObject)current.OverrideJson.DeepClone(),
            updatedMergedJson,
            _binder.Bind(updatedMergedJson));

        _validator.ValidateConfiguration(updatedConfiguration);
        _store.Save(updatedConfiguration);
        _current = _store.Load();
        _validator.ValidateConfiguration(_current);
        return _current;
    }
}
