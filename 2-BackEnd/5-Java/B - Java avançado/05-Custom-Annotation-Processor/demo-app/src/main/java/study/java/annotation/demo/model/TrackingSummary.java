package study.java.annotation.demo.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TrackingSummary {

  private final List<TrackedComponentInfo> components;

  public TrackingSummary(List<TrackedComponentInfo> components) {
    this.components = Collections.unmodifiableList(new ArrayList<TrackedComponentInfo>(components));
  }

  public List<TrackedComponentInfo> getComponents() {
    return components;
  }

  public int getComponentCount() {
    return components.size();
  }
}
