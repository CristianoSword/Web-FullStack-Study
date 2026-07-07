namespace Study.CSharp.JsonConfigParser.Models;

public sealed record DatabaseOptions(
    string ConnectionString,
    string Provider);
