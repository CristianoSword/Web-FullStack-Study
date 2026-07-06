using Study.CSharp.ContactBookCrud.Contracts;
using Study.CSharp.ContactBookCrud.Models;

namespace Study.CSharp.ContactBookCrud.Services;

public sealed class ContactBookService
{
    private readonly IContactRepository _repository;

    public ContactBookService(IContactRepository repository)
    {
        _repository = repository;
    }

    public IReadOnlyCollection<Contact> ListContacts() => _repository.List();

    public IReadOnlyCollection<Contact> SearchByName(string query)
    {
        return _repository
            .List()
            .Where(contact => contact.FullName.Contains(query, StringComparison.OrdinalIgnoreCase))
            .ToArray();
    }

    public Contact CreateContact(CreateContactInput input) => _repository.Add(input);

    public Contact? UpdateContact(UpdateContactInput input) => _repository.Update(input);

    public bool DeleteContact(int id) => _repository.Delete(id);
}
