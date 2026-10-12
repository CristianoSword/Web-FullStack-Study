package study.java.annotation.demo.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import study.java.annotation.demo.model.TrackedComponentInfo;

public class GeneratedIndexReader {

  public List<TrackedComponentInfo> readEntries() {
    try {
      Class<?> generatedType = Class.forName("study.java.annotation.generated.GeneratedTrackingIndex");
      Object raw = generatedType.getMethod("entries").invoke(null);
      if (!(raw instanceof List)) {
        return Collections.emptyList();
      }

      List<?> entries = (List<?>) raw;
      List<TrackedComponentInfo> result = new ArrayList<TrackedComponentInfo>();
      for (Object entry : entries) {
        if (entry instanceof String[]) {
          String[] values = (String[]) entry;
          result.add(new TrackedComponentInfo(
              values[0],
              values[1],
              values[2],
              Arrays.asList(values[3].split("\\|"))));
        }
      }
      return result;
    } catch (ReflectiveOperationException exception) {
      return Collections.emptyList();
    }
  }
}
