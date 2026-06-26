package study.java.files;

public class Main {
  public static void main(String[] args) {
    FileConfigService service = new FileConfigService();
    System.out.println(service.readAll().get(0).value());
  }
}
