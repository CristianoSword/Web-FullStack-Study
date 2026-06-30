package study.java.reactive;

public class EventValidator {
  public boolean isValid(EventPayload payload) {
    return payload.value() != null && !payload.value().isBlank();
  }
}
