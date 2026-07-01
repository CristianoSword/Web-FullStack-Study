package study.java.patterns;

public class Main {
  public static void main(String[] args) {
    Notifier notifier = new NotifierFactory().createEmail();
    System.out.println(notifier.notifyMessage("report-ready"));
  }
}
