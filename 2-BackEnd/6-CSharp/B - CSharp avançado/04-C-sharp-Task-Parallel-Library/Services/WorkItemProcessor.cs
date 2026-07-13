using Study.CSharp.TaskParallelLibrary.Configuration;
using Study.CSharp.TaskParallelLibrary.Contracts;
using Study.CSharp.TaskParallelLibrary.Models;
using Study.CSharp.TaskParallelLibrary.Validation;

namespace Study.CSharp.TaskParallelLibrary.Services;

public sealed class WorkItemProcessor : IWorkProcessor
{
    private readonly PipelineSettings _settings;
    private readonly PipelineValidator _validator;

    public WorkItemProcessor(PipelineSettings settings, PipelineValidator validator)
    {
        _settings = settings;
        _validator = validator;
    }

    public async Task<ProcessedWorkItem> ProcessAsync(WorkItem item, CancellationToken cancellationToken = default)
    {
        var startedAt = DateTimeOffset.UtcNow;
        try
        {
            _validator.ValidateWorkItem(item);
            await Task.Delay(_settings.SimulatedLatencyMs + (item.Priority * 10), cancellationToken);
            var output = $"{item.Category}:{item.Input}:priority-{item.Priority}";
            var elapsed = DateTimeOffset.UtcNow - startedAt;
            return new ProcessedWorkItem(item.Id, item.Input, true, output, elapsed);
        }
        catch (Exception exception) when (exception is not OperationCanceledException)
        {
            var elapsed = DateTimeOffset.UtcNow - startedAt;
            return new ProcessedWorkItem(item.Id, item.Input, false, exception.Message, elapsed);
        }
    }
}
