package study.java.patterns;

public class PatternValidator {
  public boolean isValid(String message) {
    return message != null && !message.isBlank();
  }
}
