using Microsoft.Extensions.Options;
using Study.CSharp.CqrsMediatRPattern.Configuration;
using Study.CSharp.CqrsMediatRPattern.Contracts;
using Study.CSharp.CqrsMediatRPattern.Domain;

namespace Study.CSharp.CqrsMediatRPattern.Services;

public sealed class TicketSeeder
{
    private readonly ISupportTicketRepository _repository;
    private readonly TicketingSettings _settings;

    public TicketSeeder(ISupportTicketRepository repository, IOptions<TicketingSettings> settings)
    {
        _repository = repository;
        _settings = settings.Value;
    }

    public async Task SeedAsync()
    {
        if (!_settings.SeedData)
        {
            return;
        }

        var existing = await _repository.ListAsync();
        if (existing.Count > 0)
        {
            return;
        }

        var now = DateTimeOffset.UtcNow;
        await _repository.AddAsync(new SupportTicket
        {
            Id = Guid.NewGuid(),
            Title = "Login blocked after password reset",
            Description = "Customer cannot access dashboard after resetting the password.",
            CustomerEmail = "marina@example.dev",
            Assignee = _settings.DefaultAssignee,
            Priority = TicketPriority.High,
            Status = TicketStatus.Open,
            CreatedAt = now,
            UpdatedAt = now,
        });
    }
}
