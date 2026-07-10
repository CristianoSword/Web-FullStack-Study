using Study.CSharp.TaskParallelLibrary.Models;

namespace Study.CSharp.TaskParallelLibrary.Contracts;

public interface IWorkItemSource
{
    Task<IReadOnlyCollection<WorkItem>> LoadAsync(CancellationToken cancellationToken = default);
}
