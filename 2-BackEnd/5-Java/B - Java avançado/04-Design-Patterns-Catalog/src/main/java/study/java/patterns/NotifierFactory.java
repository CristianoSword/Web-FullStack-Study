package study.java.patterns;

public class NotifierFactory {
  public Notifier createEmail() {
    return new EmailNotifier();
  }
}
