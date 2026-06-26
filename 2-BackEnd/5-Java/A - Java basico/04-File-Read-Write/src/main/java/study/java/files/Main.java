package study.java.files;

public class Main {
  public static void main(String[] args) {
    FileConfigService service = new FileConfigService();
    ConfigEntry entry = service.readAll().get(0);
    if (!new ConfigValidator().isValid(entry)) {
      throw new IllegalStateException("invalid config");
    }

    System.out.println(entry.value());
  }
}
