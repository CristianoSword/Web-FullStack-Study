package study.java.concurrency;

public class Main {
  public static void main(String[] args) {
    SyncSnapshot snapshot = new SyncCoordinator().incrementMany(3);
    System.out.println(snapshot.increments());
  }
}
