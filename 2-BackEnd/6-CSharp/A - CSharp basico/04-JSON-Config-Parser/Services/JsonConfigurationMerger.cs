using System.Text.Json.Nodes;
using Study.CSharp.JsonConfigParser.Contracts;

namespace Study.CSharp.JsonConfigParser.Services;

public sealed class JsonConfigurationMerger : IJsonConfigurationMerger
{
    public JsonObject Merge(JsonObject baseNode, JsonObject overrideNode)
    {
        foreach (var property in overrideNode)
        {
            if (property.Value is JsonObject overrideChild &&
                baseNode[property.Key] is JsonObject baseChild)
            {
                baseNode[property.Key] = Merge(baseChild, overrideChild);
                continue;
            }

            baseNode[property.Key] = property.Value?.DeepClone();
        }

        return baseNode;
    }
}
