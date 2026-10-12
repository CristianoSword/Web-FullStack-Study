package study.java.annotation.demo.service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import study.java.annotation.api.TrackedComponent;
import study.java.annotation.api.TrackedOperation;
import study.java.annotation.demo.model.TrackedComponentInfo;
import study.java.annotation.demo.model.TrackingSummary;

public class RuntimeTrackedScanner {

  public TrackingSummary scan(Class<?>... componentTypes) {
    List<TrackedComponentInfo> components = new ArrayList<TrackedComponentInfo>();
    for (Class<?> componentType : componentTypes) {
      TrackedComponent component = componentType.getAnnotation(TrackedComponent.class);
      if (component == null) {
        continue;
      }

      List<String> operations = new ArrayList<String>();
      for (Method method : componentType.getDeclaredMethods()) {
        TrackedOperation operation = method.getAnnotation(TrackedOperation.class);
        if (operation != null) {
          operations.add(operation.value() + " (critical=" + operation.critical() + ")");
        }
      }

      components.add(new TrackedComponentInfo(
          componentType.getName(),
          component.domain(),
          component.owner(),
          operations));
    }
    return new TrackingSummary(components);
  }
}
