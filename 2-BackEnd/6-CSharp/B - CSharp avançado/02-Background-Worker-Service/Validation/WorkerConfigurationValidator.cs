using Cronos;
using Study.CSharp.BackgroundWorkerService.Configuration;
using Study.CSharp.BackgroundWorkerService.Exceptions;

namespace Study.CSharp.BackgroundWorkerService.Validation;

public sealed class WorkerConfigurationValidator
{
    public void Validate(WorkerRuntimeSettings settings, IEnumerable<string> registeredHandlers)
    {
        if (settings.PollIntervalSeconds is < 1 or > 3600)
        {
            throw new DomainValidationException("PollIntervalSeconds must be between 1 and 3600.");
        }

        var handlerSet = new HashSet<string>(registeredHandlers, StringComparer.OrdinalIgnoreCase);
        var seenNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        foreach (var job in settings.Jobs)
        {
            if (string.IsNullOrWhiteSpace(job.Name))
            {
                throw new DomainValidationException("Every job must define a name.");
            }

            if (!seenNames.Add(job.Name))
            {
                throw new DomainValidationException($"The job name '{job.Name}' is duplicated.");
            }

            if (string.IsNullOrWhiteSpace(job.Handler))
            {
                throw new DomainValidationException($"The job '{job.Name}' must define a handler.");
            }

            if (!handlerSet.Contains(job.Handler))
            {
                throw new DomainValidationException($"The job '{job.Name}' references the unknown handler '{job.Handler}'.");
            }

            if (string.IsNullOrWhiteSpace(job.Payload))
            {
                throw new DomainValidationException($"The job '{job.Name}' must define a payload.");
            }

            try
            {
                _ = CronExpression.Parse(job.Cron);
            }
            catch (CronFormatException exception)
            {
                throw new DomainValidationException($"The cron expression for job '{job.Name}' is invalid: {exception.Message}");
            }
        }
    }
}
