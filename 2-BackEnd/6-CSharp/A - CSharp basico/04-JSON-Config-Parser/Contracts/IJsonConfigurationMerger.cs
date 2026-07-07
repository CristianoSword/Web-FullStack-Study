using System.Text.Json.Nodes;

namespace Study.CSharp.JsonConfigParser.Contracts;

public interface IJsonConfigurationMerger
{
    JsonObject Merge(JsonObject baseNode, JsonObject overrideNode);
}
