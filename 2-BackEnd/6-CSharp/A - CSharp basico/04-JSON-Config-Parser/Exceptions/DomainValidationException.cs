namespace Study.CSharp.JsonConfigParser.Exceptions;

public sealed class DomainValidationException : Exception
{
    public DomainValidationException(string message)
        : base(message)
    {
    }
}
