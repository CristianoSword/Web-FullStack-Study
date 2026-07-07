using Study.CSharp.JsonConfigParser.Exceptions;
using Study.CSharp.JsonConfigParser.Models;

namespace Study.CSharp.JsonConfigParser.Validation;

public sealed class ConfigurationValidator
{
    public void ValidateConfiguration(ParsedConfiguration configuration)
    {
        var app = configuration.App;
        if (string.IsNullOrWhiteSpace(app.Name))
        {
            throw new DomainValidationException("App.Name is required.");
        }

        if (string.IsNullOrWhiteSpace(app.Environment))
        {
            throw new DomainValidationException("App.Environment is required.");
        }

        if (string.IsNullOrWhiteSpace(app.Server.Host))
        {
            throw new DomainValidationException("App.Server.Host is required.");
        }

        if (app.Server.Port is < 1 or > 65535)
        {
            throw new DomainValidationException("App.Server.Port must be between 1 and 65535.");
        }

        if (string.IsNullOrWhiteSpace(app.Database.ConnectionString))
        {
            throw new DomainValidationException("App.Database.ConnectionString is required.");
        }

        if (string.IsNullOrWhiteSpace(app.Database.Provider))
        {
            throw new DomainValidationException("App.Database.Provider is required.");
        }

        if (app.Cache.Enabled && app.Cache.DurationSeconds <= 0)
        {
            throw new DomainValidationException("App.Cache.DurationSeconds must be positive when cache is enabled.");
        }
    }

    public void ValidateMutation(ConfigMutation mutation)
    {
        if (string.IsNullOrWhiteSpace(mutation.Path))
        {
            throw new DomainValidationException("Mutation path cannot be empty.");
        }

        if (string.IsNullOrWhiteSpace(mutation.RawValue))
        {
            throw new DomainValidationException("Mutation value cannot be empty.");
        }
    }
}
