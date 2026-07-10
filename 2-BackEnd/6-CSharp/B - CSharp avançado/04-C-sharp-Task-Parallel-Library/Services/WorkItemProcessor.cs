using Study.CSharp.TaskParallelLibrary.Configuration;
using Study.CSharp.TaskParallelLibrary.Contracts;
using Study.CSharp.TaskParallelLibrary.Models;

namespace Study.CSharp.TaskParallelLibrary.Services;

public sealed class WorkItemProcessor : IWorkProcessor
{
    private readonly PipelineSettings _settings;

    public WorkItemProcessor(PipelineSettings settings)
    {
        _settings = settings;
    }

    public async Task<ProcessedWorkItem> ProcessAsync(WorkItem item, CancellationToken cancellationToken = default)
    {
        var startedAt = DateTimeOffset.UtcNow;
        await Task.Delay(_settings.SimulatedLatencyMs + (item.Priority * 10), cancellationToken);
        var output = $"{item.Category}:{item.Input}:priority-{item.Priority}";
        var elapsed = DateTimeOffset.UtcNow - startedAt;
        return new ProcessedWorkItem(item.Id, item.Input, true, output, elapsed);
    }
}
