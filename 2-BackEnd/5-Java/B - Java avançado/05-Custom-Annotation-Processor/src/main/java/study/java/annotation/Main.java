package study.java.annotation;

public class Main {
  public static void main(String[] args) {
    TrackingResult result = new ReflectionScanner().scan(TrackedService.class);
    System.out.println(result.label());
  }
}
