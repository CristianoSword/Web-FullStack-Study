package study.java.files;

import java.util.List;

public class FileConfigService {
  public List<ConfigEntry> readAll() {
    return List.of(new ConfigEntry("env", "dev"));
  }
}
