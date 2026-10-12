package study.java.spring.exception;

public class BusinessRuleException extends RuntimeException {

  public BusinessRuleException(String message) {
    super(message);
  }
}
