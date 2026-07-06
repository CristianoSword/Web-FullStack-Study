namespace Study.CSharp.LibraryCatalogOop.Exceptions;

public sealed class DomainValidationException : Exception
{
    public DomainValidationException(string message)
        : base(message)
    {
    }
}
