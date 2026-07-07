namespace Study.CSharp.InterfacePolymorphism.Exceptions;

public sealed class DomainValidationException : Exception
{
    public DomainValidationException(string message)
        : base(message)
    {
    }
}
