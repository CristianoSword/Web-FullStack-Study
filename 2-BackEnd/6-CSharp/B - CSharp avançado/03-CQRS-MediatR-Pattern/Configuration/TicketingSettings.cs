namespace Study.CSharp.CqrsMediatRPattern.Configuration;

public sealed class TicketingSettings
{
    public bool SeedData { get; init; } = true;
    public string DefaultAssignee { get; init; } = "triage-bot";
}
