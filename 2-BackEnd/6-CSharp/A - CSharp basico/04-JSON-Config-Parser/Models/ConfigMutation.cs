namespace Study.CSharp.JsonConfigParser.Models;

public sealed record ConfigMutation(
    string Path,
    string RawValue);
