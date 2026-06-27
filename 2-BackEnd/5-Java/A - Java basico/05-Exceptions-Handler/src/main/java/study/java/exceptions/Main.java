package study.java.exceptions;

public class Main {
  public static void main(String[] args) {
    try {
      System.out.println(new ExceptionService().load(false).message());
    } catch (DomainException error) {
      System.out.println(error.getMessage());
    }
  }
}
