using Study.CSharp.ContactBookCrud.Contracts;
using Study.CSharp.ContactBookCrud.Models;

namespace Study.CSharp.ContactBookCrud.Services;

public sealed class InMemoryContactRepository : IContactRepository
{
    private readonly List<Contact> _contacts = new();
    private int _nextId = 1;

    public InMemoryContactRepository(bool seedContacts)
    {
        if (seedContacts)
        {
            Add(new CreateContactInput("Marina Costa", "marina@example.dev", "+55 11 99999-0001"));
            Add(new CreateContactInput("Leo Nunes", "leo@example.dev", "+55 11 99999-0002"));
        }
    }

    public IReadOnlyCollection<Contact> List() => _contacts.OrderBy(contact => contact.FullName).ToArray();

    public Contact? FindById(int id) => _contacts.FirstOrDefault(contact => contact.Id == id);

    public Contact? FindByEmail(string email) =>
        _contacts.FirstOrDefault(contact => string.Equals(contact.Email, email, StringComparison.OrdinalIgnoreCase));

    public Contact Add(CreateContactInput input)
    {
        var contact = new Contact(_nextId++, input.FullName, input.Email, input.Phone, DateTimeOffset.UtcNow);
        _contacts.Add(contact);
        return contact;
    }

    public Contact? Update(UpdateContactInput input)
    {
        var current = FindById(input.Id);
        if (current is null)
        {
            return null;
        }

        var updated = current with
        {
            FullName = input.FullName,
            Email = input.Email,
            Phone = input.Phone,
        };

        var index = _contacts.FindIndex(contact => contact.Id == input.Id);
        _contacts[index] = updated;
        return updated;
    }

    public bool Delete(int id)
    {
        var removed = _contacts.RemoveAll(contact => contact.Id == id);
        return removed > 0;
    }
}
