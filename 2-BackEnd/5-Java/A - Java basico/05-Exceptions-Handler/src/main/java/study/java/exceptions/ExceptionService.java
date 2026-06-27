package study.java.exceptions;

public class ExceptionService {
  public ErrorPayload load(boolean fail) {
    if (fail) {
      throw new DomainException("operation failed");
    }

    return new ErrorPayload("OK", "loaded");
  }
}
