package study.java.annotation.demo.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TrackedComponentInfo {

  private final String className;
  private final String domain;
  private final String owner;
  private final List<String> operations;

  public TrackedComponentInfo(
      String className,
      String domain,
      String owner,
      List<String> operations) {
    this.className = className;
    this.domain = domain;
    this.owner = owner;
    this.operations = Collections.unmodifiableList(new ArrayList<String>(operations));
  }

  public String getClassName() {
    return className;
  }

  public String getDomain() {
    return domain;
  }

  public String getOwner() {
    return owner;
  }

  public List<String> getOperations() {
    return operations;
  }
}
