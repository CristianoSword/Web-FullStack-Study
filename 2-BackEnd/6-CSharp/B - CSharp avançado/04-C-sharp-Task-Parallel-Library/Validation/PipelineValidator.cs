using Study.CSharp.TaskParallelLibrary.Configuration;
using Study.CSharp.TaskParallelLibrary.Exceptions;
using Study.CSharp.TaskParallelLibrary.Models;

namespace Study.CSharp.TaskParallelLibrary.Validation;

public sealed class PipelineValidator
{
    public void ValidateSettings(PipelineSettings settings)
    {
        if (settings.BatchSize is < 1 or > 100)
        {
            throw new DomainValidationException("BatchSize must be between 1 and 100.");
        }

        if (settings.MaxDegreeOfParallelism is < 1 or > 32)
        {
            throw new DomainValidationException("MaxDegreeOfParallelism must be between 1 and 32.");
        }

        if (settings.SimulatedLatencyMs is < 0 or > 5000)
        {
            throw new DomainValidationException("SimulatedLatencyMs must be between 0 and 5000.");
        }
    }

    public void ValidateWorkItems(IReadOnlyCollection<WorkItem> items)
    {
        if (items.Count == 0)
        {
            throw new DomainValidationException("The pipeline requires at least one work item.");
        }
    }

    public void ValidateWorkItem(WorkItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Input))
        {
            throw new DomainValidationException("Work item input cannot be empty.");
        }

        if (string.IsNullOrWhiteSpace(item.Category))
        {
            throw new DomainValidationException("Work item category cannot be empty.");
        }

        if (item.Priority is < 1 or > 5)
        {
            throw new DomainValidationException("Work item priority must be between 1 and 5.");
        }
    }
}
