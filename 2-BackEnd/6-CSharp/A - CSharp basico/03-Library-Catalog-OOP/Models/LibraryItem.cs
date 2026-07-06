namespace Study.CSharp.LibraryCatalogOop.Models;

public abstract record LibraryItem(
    int Id,
    string Title,
    int PublicationYear,
    string CatalogCode,
    LibraryItemStatus Status);
