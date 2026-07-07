using System.Text.Json.Nodes;

namespace Study.CSharp.JsonConfigParser.Models;

public sealed record ParsedConfiguration(
    ConfigurationFileSet Files,
    JsonObject BaseJson,
    JsonObject? OverrideJson,
    JsonObject MergedJson,
    ApplicationConfig App);
