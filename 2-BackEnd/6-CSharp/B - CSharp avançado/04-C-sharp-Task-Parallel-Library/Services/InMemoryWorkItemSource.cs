using Study.CSharp.TaskParallelLibrary.Contracts;
using Study.CSharp.TaskParallelLibrary.Models;

namespace Study.CSharp.TaskParallelLibrary.Services;

public sealed class InMemoryWorkItemSource : IWorkItemSource
{
    public Task<IReadOnlyCollection<WorkItem>> LoadAsync(CancellationToken cancellationToken = default)
    {
        var items = Enumerable.Range(1, 15)
            .Select(index => new WorkItem(
                Guid.NewGuid(),
                $"payload-{index:D2}",
                index % 2 == 0 ? "images" : "documents",
                (index % 3) + 1))
            .ToArray();

        return Task.FromResult<IReadOnlyCollection<WorkItem>>(items);
    }
}
