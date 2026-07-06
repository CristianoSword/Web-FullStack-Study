using Study.CSharp.ContactBookCrud.Contracts;
using Study.CSharp.ContactBookCrud.Exceptions;
using Study.CSharp.ContactBookCrud.Models;
using Study.CSharp.ContactBookCrud.Validation;

namespace Study.CSharp.ContactBookCrud.Services;

public sealed class ContactBookService
{
    private readonly IContactRepository _repository;
    private readonly ContactInputValidator _validator;

    public ContactBookService(IContactRepository repository, ContactInputValidator validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public IReadOnlyCollection<Contact> ListContacts() => _repository.List();

    public IReadOnlyCollection<Contact> SearchByName(string query)
    {
        var normalizedQuery = _validator.NormalizeSearchQuery(query);

        return _repository
            .List()
            .Where(contact => contact.FullName.Contains(normalizedQuery, StringComparison.OrdinalIgnoreCase))
            .ToArray();
    }

    public Contact CreateContact(CreateContactInput input)
    {
        var normalized = _validator.NormalizeCreate(input);
        EnsureEmailIsUnique(normalized.Email);
        return _repository.Add(normalized);
    }

    public Contact? UpdateContact(UpdateContactInput input)
    {
        var normalized = _validator.NormalizeUpdate(input);
        var current = _repository.FindById(normalized.Id);
        if (current is null)
        {
            return null;
        }

        EnsureEmailIsUnique(normalized.Email, normalized.Id);
        return _repository.Update(normalized);
    }

    public bool DeleteContact(int id)
    {
        if (id <= 0)
        {
            throw new DomainValidationException("The contact id must be a positive integer.");
        }

        return _repository.Delete(id);
    }

    private void EnsureEmailIsUnique(string email, int? ignoredContactId = null)
    {
        var existingContact = _repository.FindByEmail(email);
        if (existingContact is null)
        {
            return;
        }

        if (ignoredContactId.HasValue && existingContact.Id == ignoredContactId.Value)
        {
            return;
        }

        throw new DomainValidationException("A contact with this email already exists.");
    }
}
