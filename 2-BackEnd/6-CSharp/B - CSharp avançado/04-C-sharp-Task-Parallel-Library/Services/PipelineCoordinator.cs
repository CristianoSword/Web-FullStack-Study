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
        var results = await ProcessItemsAsync(workItems, cancellationToken);
        return CreateSummary(results.Items, results.Elapsed);
    }

    public Task<IReadOnlyCollection<WorkItem>> LoadPreviewAsync(CancellationToken cancellationToken = default)
    {
        return _source.LoadAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<ProcessedWorkItem>> RunSampleAsync(CancellationToken cancellationToken = default)
    {
        var workItems = (await _source.LoadAsync(cancellationToken)).Take(_settings.BatchSize).ToArray();
        var results = await ProcessItemsAsync(workItems, cancellationToken);
        return results.Items;
    }

    private async Task<(IReadOnlyCollection<ProcessedWorkItem> Items, TimeSpan Elapsed)> ProcessItemsAsync(
        IReadOnlyCollection<WorkItem> workItems,
        CancellationToken cancellationToken)
    {
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

        return (results.ToArray(), stopwatch.Elapsed);
    }

    private static PipelineRunSummary CreateSummary(IReadOnlyCollection<ProcessedWorkItem> processedItems, TimeSpan elapsed)
    {
        return new PipelineRunSummary(
            processedItems.Count,
            processedItems.Count(item => item.Success),
            processedItems.Count(item => !item.Success),
            elapsed);
    }
}
