package study.java.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

public class FileConfigService {
  private final Path configPath;

  public FileConfigService() {
    this(Path.of("data", "app.properties"));
  }

  public FileConfigService(Path configPath) {
    this.configPath = configPath;
  }

  public List<ConfigEntry> readAll() {
    ensureSeedFile();

    try {
      List<ConfigEntry> entries = new ArrayList<>();
      for (String line : Files.readAllLines(configPath)) {
        if (line.isBlank() || line.startsWith("#") || !line.contains("=")) {
          continue;
        }

        String[] parts = line.split("=", 2);
        entries.add(new ConfigEntry(parts[0].trim(), parts[1].trim()));
      }
      return entries;
    } catch (IOException error) {
      throw new IllegalStateException("failed to read config file", error);
    }
  }

  public ConfigView writeDefaultIfMissing() {
    ensureSeedFile();
    return new ConfigView(configPath.toAbsolutePath().toString());
  }

  private void ensureSeedFile() {
    try {
      Files.createDirectories(configPath.getParent());
      if (!Files.exists(configPath)) {
        Files.writeString(
            configPath,
            "# study configuration\nenv=dev\nregion=sa-east\nfeatureFlag=enabled\n",
            StandardOpenOption.CREATE,
            StandardOpenOption.TRUNCATE_EXISTING);
      }
    } catch (IOException error) {
      throw new IllegalStateException("failed to initialize config file", error);
    }
  }
}
