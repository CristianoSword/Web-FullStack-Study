using Study.CSharp.TaskParallelLibrary.Models;

namespace Study.CSharp.TaskParallelLibrary.Contracts;

public interface IWorkProcessor
{
    Task<ProcessedWorkItem> ProcessAsync(WorkItem item, CancellationToken cancellationToken = default);
}
