package study.java.patterns;

public class ReportRegistry {
  private static final ReportRegistry INSTANCE = new ReportRegistry();

  public static ReportRegistry getInstance() {
    return INSTANCE;
  }
}
