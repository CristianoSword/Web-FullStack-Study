using Study.CSharp.CqrsMediatRPattern.Exceptions;
using Study.CSharp.CqrsMediatRPattern.Features.Tickets.Commands.UpdateTicketStatus;

namespace Study.CSharp.CqrsMediatRPattern.Validation;

public sealed class UpdateTicketStatusCommandValidator : IRequestValidator<UpdateTicketStatusCommand>
{
    public Task ValidateAsync(UpdateTicketStatusCommand request, CancellationToken cancellationToken)
    {
        if (request.TicketId == Guid.Empty)
        {
            throw new DomainValidationException("TicketId is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Status))
        {
            throw new DomainValidationException("Status is required.");
        }

        return Task.CompletedTask;
    }
}
