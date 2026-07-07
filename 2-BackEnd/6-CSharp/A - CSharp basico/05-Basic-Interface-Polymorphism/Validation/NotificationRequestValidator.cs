using System.Net.Mail;
using System.Text.RegularExpressions;
using Study.CSharp.InterfacePolymorphism.Exceptions;
using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Validation;

public sealed class NotificationRequestValidator
{
    private static readonly Regex PhoneRegex = new("^[0-9+()\\-\\s]{8,20}$", RegexOptions.Compiled);

    public void Validate(NotificationRequest request, string defaultSender)
    {
        if (string.IsNullOrWhiteSpace(defaultSender))
        {
            throw new DomainValidationException("The default sender cannot be empty.");
        }

        if (string.IsNullOrWhiteSpace(request.Recipient))
        {
            throw new DomainValidationException("The recipient is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Subject))
        {
            throw new DomainValidationException("The subject is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Body))
        {
            throw new DomainValidationException("The body is required.");
        }

        switch (request.Channel)
        {
            case ChannelKind.Email:
                ValidateEmail(request.Recipient);
                break;
            case ChannelKind.Sms:
                ValidatePhone(request.Recipient);
                break;
            case ChannelKind.Slack:
                ValidateSlackAddress(request.Recipient);
                break;
        }
    }

    private static void ValidateEmail(string recipient)
    {
        try
        {
            _ = new MailAddress(recipient);
        }
        catch (FormatException)
        {
            throw new DomainValidationException("Email recipients must use a valid email address.");
        }
    }

    private static void ValidatePhone(string recipient)
    {
        if (!PhoneRegex.IsMatch(recipient))
        {
            throw new DomainValidationException("SMS recipients must use a valid phone number.");
        }
    }

    private static void ValidateSlackAddress(string recipient)
    {
        if (!recipient.StartsWith("#", StringComparison.Ordinal) &&
            !recipient.StartsWith("@", StringComparison.Ordinal))
        {
            throw new DomainValidationException("Slack recipients must start with '#' or '@'.");
        }
    }
}
