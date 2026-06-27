package study.java.exceptions;

public class ExceptionValidator {
  public void ensure(boolean condition, String message) {
    if (!condition) {
      throw new DomainException(message);
    }
  }
}
