using System.Text.Json;

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
        var settings = LoadSettings();
        var source = new Services.InMemoryWorkItemSource();
        var validator = new Validation.PipelineValidator();
        var processor = new Services.WorkItemProcessor(settings, validator);
        var coordinator = new Services.PipelineCoordinator(settings, source, processor, validator);
        var consoleUi = new Cli.PipelineConsole(coordinator);
        return new TaskParallelApplication(settings, coordinator, consoleUi);
    }

    public async Task RunAsync()
    {
        Cli.MenuRenderer.PrintBanner(Settings);
        await ConsoleUi.RunAsync();
    }

    private static Configuration.PipelineSettings LoadSettings()
    {
        var settingsPath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
        if (!File.Exists(settingsPath))
        {
            return new Configuration.PipelineSettings();
        }

        try
        {
            var json = File.ReadAllText(settingsPath);
            var document = JsonSerializer.Deserialize<AppSettingsDocument>(json);
            return document?.Pipeline ?? new Configuration.PipelineSettings();
        }
        catch (JsonException)
        {
            return new Configuration.PipelineSettings();
        }
        catch (IOException)
        {
            return new Configuration.PipelineSettings();
        }
    }

    private sealed class AppSettingsDocument
    {
        public Configuration.PipelineSettings Pipeline { get; init; } = new();
    }
}
