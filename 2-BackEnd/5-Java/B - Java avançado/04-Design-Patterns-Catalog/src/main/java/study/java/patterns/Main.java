package study.java.patterns;

public class Main {
  public static void main(String[] args) {
    if (!new PatternValidator().isValid("report-ready")) {
      throw new IllegalArgumentException("invalid pattern input");
    }

    Notifier notifier = new NotifierFactory().createEmail();
    System.out.println(notifier.notifyMessage("report-ready"));
  }
}
