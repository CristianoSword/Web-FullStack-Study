using System.Net.Mail;
using Study.CSharp.CqrsMediatRPattern.Exceptions;
using Study.CSharp.CqrsMediatRPattern.Features.Tickets.Commands.CreateTicket;

namespace Study.CSharp.CqrsMediatRPattern.Validation;

public sealed class CreateTicketCommandValidator : IRequestValidator<CreateTicketCommand>
{
    public Task ValidateAsync(CreateTicketCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Title) || request.Title.Length > 120)
        {
            throw new DomainValidationException("Title is required and must contain at most 120 characters.");
        }

        if (string.IsNullOrWhiteSpace(request.Description) || request.Description.Length > 1000)
        {
            throw new DomainValidationException("Description is required and must contain at most 1000 characters.");
        }

        try
        {
            _ = new MailAddress(request.CustomerEmail);
        }
        catch (FormatException)
        {
            throw new DomainValidationException("CustomerEmail must be a valid email address.");
        }

        return Task.CompletedTask;
    }
}
