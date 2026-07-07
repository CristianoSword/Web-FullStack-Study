using Study.CSharp.JsonConfigParser.Models;

namespace Study.CSharp.JsonConfigParser.Contracts;

public interface IConfigurationStore
{
    ParsedConfiguration Load();
    void Save(ParsedConfiguration configuration);
}
