namespace Study.CSharp.CqrsMediatRPattern.Validation;

public interface IRequestValidator<in TRequest>
{
    Task ValidateAsync(TRequest request, CancellationToken cancellationToken);
}
