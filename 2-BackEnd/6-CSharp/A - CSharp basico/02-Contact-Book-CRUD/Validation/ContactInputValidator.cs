using System.Net.Mail;
using System.Text.RegularExpressions;
using Study.CSharp.ContactBookCrud.Exceptions;
using Study.CSharp.ContactBookCrud.Models;

namespace Study.CSharp.ContactBookCrud.Validation;

public sealed class ContactInputValidator
{
    private static readonly Regex MultiSpaceRegex = new("\\s+", RegexOptions.Compiled);
    private static readonly Regex PhoneAllowedCharsRegex = new("^[0-9+()\\-\\s]+$", RegexOptions.Compiled);

    public string NormalizeSearchQuery(string query)
    {
        var normalizedQuery = NormalizeWhitespace(query);
        if (string.IsNullOrWhiteSpace(normalizedQuery))
        {
            throw new DomainValidationException("Search text cannot be empty.");
        }

        return normalizedQuery;
    }

    public CreateContactInput NormalizeCreate(CreateContactInput input)
    {
        return new CreateContactInput(
            NormalizeName(input.FullName),
            NormalizeEmail(input.Email),
            NormalizePhone(input.Phone));
    }

    public UpdateContactInput NormalizeUpdate(UpdateContactInput input)
    {
        if (input.Id <= 0)
        {
            throw new DomainValidationException("The contact id must be a positive integer.");
        }

        return new UpdateContactInput(
            input.Id,
            NormalizeName(input.FullName),
            NormalizeEmail(input.Email),
            NormalizePhone(input.Phone));
    }

    private static string NormalizeName(string fullName)
    {
        var normalizedName = NormalizeWhitespace(fullName);
        if (normalizedName.Length < 3)
        {
            throw new DomainValidationException("The full name must contain at least 3 characters.");
        }

        return normalizedName;
    }

    private static string NormalizeEmail(string email)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        if (normalizedEmail.Length == 0)
        {
            throw new DomainValidationException("The email is required.");
        }

        try
        {
            _ = new MailAddress(normalizedEmail);
            return normalizedEmail;
        }
        catch (FormatException)
        {
            throw new DomainValidationException("The email format is invalid.");
        }
    }

    private static string NormalizePhone(string phone)
    {
        var normalizedPhone = NormalizeWhitespace(phone);
        if (normalizedPhone.Length == 0)
        {
            throw new DomainValidationException("The phone number is required.");
        }

        if (!PhoneAllowedCharsRegex.IsMatch(normalizedPhone))
        {
            throw new DomainValidationException("The phone number contains unsupported characters.");
        }

        var digits = normalizedPhone.Where(char.IsDigit).ToArray();
        if (digits.Length < 8 || digits.Length > 15)
        {
            throw new DomainValidationException("The phone number must contain between 8 and 15 digits.");
        }

        return normalizedPhone;
    }

    private static string NormalizeWhitespace(string value)
    {
        var trimmed = value.Trim();
        return MultiSpaceRegex.Replace(trimmed, " ");
    }
}
