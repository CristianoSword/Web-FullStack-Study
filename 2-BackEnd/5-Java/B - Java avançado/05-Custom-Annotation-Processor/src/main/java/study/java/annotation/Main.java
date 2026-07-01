package study.java.annotation;

public class Main {
  public static void main(String[] args) {
    if (!new ClassValidator().isScannable(TrackedService.class)) {
      throw new IllegalArgumentException("invalid class");
    }

    TrackingResult result = new ReflectionScanner().scan(TrackedService.class);
    System.out.println(result.label());
  }
}
