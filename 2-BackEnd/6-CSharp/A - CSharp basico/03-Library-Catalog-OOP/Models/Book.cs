namespace Study.CSharp.LibraryCatalogOop.Models;

public sealed record Book(
    int Id,
    string Title,
    int PublicationYear,
    string CatalogCode,
    LibraryItemStatus Status,
    string Author,
    string Isbn,
    Genre Genre)
    : LibraryItem(Id, Title, PublicationYear, CatalogCode, Status);
