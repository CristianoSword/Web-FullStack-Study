namespace Study.CSharp.ContactBookCrud.Configuration;

public sealed class ContactBookSettings
{
    public bool SeedContacts { get; init; } = true;
    public int PageSize { get; init; } = 10;
}
