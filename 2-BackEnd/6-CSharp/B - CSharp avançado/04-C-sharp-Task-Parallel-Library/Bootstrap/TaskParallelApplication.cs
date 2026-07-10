namespace Study.CSharp.TaskParallelLibrary.Bootstrap;

public sealed class TaskParallelApplication
{
    public Configuration.PipelineSettings Settings { get; }
    public Services.PipelineCoordinator Coordinator { get; }
    public Cli.PipelineConsole ConsoleUi { get; }

    private TaskParallelApplication(
        Configuration.PipelineSettings settings,
        Services.PipelineCoordinator coordinator,
        Cli.PipelineConsole consoleUi)
    {
        Settings = settings;
        Coordinator = coordinator;
        ConsoleUi = consoleUi;
    }

    public static TaskParallelApplication CreateDefault()
    {
        var settings = new Configuration.PipelineSettings();
        var source = new Services.InMemoryWorkItemSource();
        var processor = new Services.WorkItemProcessor(settings);
        var coordinator = new Services.PipelineCoordinator(settings, source, processor);
        var consoleUi = new Cli.PipelineConsole(coordinator);
        return new TaskParallelApplication(settings, coordinator, consoleUi);
    }

    public async Task RunAsync()
    {
        Cli.MenuRenderer.PrintBanner(Settings);
        await ConsoleUi.RunAsync();
    }
}
