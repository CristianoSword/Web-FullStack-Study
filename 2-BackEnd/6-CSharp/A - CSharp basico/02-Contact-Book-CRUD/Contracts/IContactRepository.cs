using Study.CSharp.ContactBookCrud.Models;

namespace Study.CSharp.ContactBookCrud.Contracts;

public interface IContactRepository
{
    IReadOnlyCollection<Contact> List();
    Contact? FindById(int id);
    Contact? FindByEmail(string email);
    Contact Add(CreateContactInput input);
    Contact? Update(UpdateContactInput input);
    bool Delete(int id);
}
