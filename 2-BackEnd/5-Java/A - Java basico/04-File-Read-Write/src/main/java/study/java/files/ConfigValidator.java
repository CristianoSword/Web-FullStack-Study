package study.java.files;

public class ConfigValidator {
  public boolean isValid(ConfigEntry entry) {
    return !entry.key().isBlank();
  }
}
