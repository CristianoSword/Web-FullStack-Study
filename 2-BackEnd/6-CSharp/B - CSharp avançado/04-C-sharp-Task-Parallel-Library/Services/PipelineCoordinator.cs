using System.Collections.Concurrent;
using System.Diagnostics;
using System.Threading.Tasks.Dataflow;
using Study.CSharp.TaskParallelLibrary.Configuration;
using Study.CSharp.TaskParallelLibrary.Contracts;
using Study.CSharp.TaskParallelLibrary.Models;

namespace Study.CSharp.TaskParallelLibrary.Services;

public sealed class PipelineCoordinator
{
    private readonly PipelineSettings _settings;
    private readonly IWorkItemSource _source;
    private readonly IWorkProcessor _processor;

    public PipelineCoordinator(
        PipelineSettings settings,
        IWorkItemSource source,
        IWorkProcessor processor)
    {
        _settings = settings;
        _source = source;
        _processor = processor;
    }

    public async Task<PipelineRunSummary> RunAsync(CancellationToken cancellationToken = default)
    {
        var workItems = await _source.LoadAsync(cancellationToken);
        var results = new ConcurrentBag<ProcessedWorkItem>();
        var stopwatch = Stopwatch.StartNew();

        var batchBlock = new BatchBlock<WorkItem>(_settings.BatchSize);
        var transformBlock = new TransformManyBlock<WorkItem[], ProcessedWorkItem>(
            async batch =>
            {
                var processingTasks = batch.Select(item => _processor.ProcessAsync(item, cancellationToken));
                var processed = await Task.WhenAll(processingTasks);
                return processed;
            },
            new ExecutionDataflowBlockOptions
            {
                MaxDegreeOfParallelism = _settings.MaxDegreeOfParallelism,
                CancellationToken = cancellationToken,
            });

        var resultBlock = new ActionBlock<ProcessedWorkItem>(
            item => results.Add(item),
            new ExecutionDataflowBlockOptions
            {
                MaxDegreeOfParallelism = _settings.MaxDegreeOfParallelism,
                CancellationToken = cancellationToken,
            });

        batchBlock.LinkTo(transformBlock, new DataflowLinkOptions { PropagateCompletion = true });
        transformBlock.LinkTo(resultBlock, new DataflowLinkOptions { PropagateCompletion = true });

        foreach (var item in workItems)
        {
            await batchBlock.SendAsync(item, cancellationToken);
        }

        batchBlock.Complete();
        await resultBlock.Completion;
        stopwatch.Stop();

        var processedItems = results.ToArray();
        return new PipelineRunSummary(
            processedItems.Length,
            processedItems.Count(item => item.Success),
            processedItems.Count(item => !item.Success),
            stopwatch.Elapsed);
    }
}
