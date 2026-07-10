using MediatR;
using Microsoft.Extensions.Options;
using Study.CSharp.CqrsMediatRPattern.Configuration;
using Study.CSharp.CqrsMediatRPattern.Contracts;
using Study.CSharp.CqrsMediatRPattern.Domain;
using Study.CSharp.CqrsMediatRPattern.Exceptions;
using Study.CSharp.CqrsMediatRPattern.Models;
using Study.CSharp.CqrsMediatRPattern.Services;

namespace Study.CSharp.CqrsMediatRPattern.Features.Tickets.Commands.CreateTicket;

public sealed class CreateTicketCommandHandler : IRequestHandler<CreateTicketCommand, TicketResponse>
{
    private readonly ISupportTicketRepository _repository;
    private readonly TicketingSettings _settings;

    public CreateTicketCommandHandler(
        ISupportTicketRepository repository,
        IOptions<TicketingSettings> settings)
    {
        _repository = repository;
        _settings = settings.Value;
    }

    public async Task<TicketResponse> Handle(CreateTicketCommand request, CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<TicketPriority>(request.Priority, true, out var priority))
        {
            throw new DomainValidationException("Priority must be one of: Low, Medium, High, Critical.");
        }

        var ticket = new SupportTicket
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            CustomerEmail = request.CustomerEmail,
            Assignee = string.IsNullOrWhiteSpace(request.Assignee) ? _settings.DefaultAssignee : request.Assignee.Trim(),
            Priority = priority,
            Status = TicketStatus.Open,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow,
        };

        await _repository.AddAsync(ticket, cancellationToken);
        return TicketMapper.ToResponse(ticket);
    }
}
