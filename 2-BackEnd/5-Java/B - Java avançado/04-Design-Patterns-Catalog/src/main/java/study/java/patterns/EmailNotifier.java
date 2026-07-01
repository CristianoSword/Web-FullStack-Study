package study.java.patterns;

public class EmailNotifier implements Notifier {
  @Override
  public String notifyMessage(String message) {
    return "email:" + message;
  }
}
