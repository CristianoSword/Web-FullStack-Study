package study.java.annotation;

public class ReflectionScanner {
  public TrackingResult scan(Class<?> type) {
    return new TrackingResult(type.getSimpleName());
  }
}
