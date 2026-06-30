package study.java.concurrency;

public class Main {
  public static void main(String[] args) {
    SyncValidator validator = new SyncValidator();
    if (!validator.isValid(3)) {
      throw new IllegalArgumentException("invalid increment amount");
    }

    SyncSnapshot snapshot = new SyncCoordinator().incrementMany(3);
    System.out.println(snapshot.increments());
  }
}
