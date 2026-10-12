package study.java.annotation.demo;

import java.util.List;
import study.java.annotation.demo.model.TrackedComponentInfo;
import study.java.annotation.demo.model.TrackingSummary;
import study.java.annotation.demo.sample.BillingWorkflowService;
import study.java.annotation.demo.sample.InventorySyncService;
import study.java.annotation.demo.service.GeneratedIndexReader;
import study.java.annotation.demo.service.RuntimeTrackedScanner;

public class Main {

  public static void main(String[] args) {
    TrackingSummary runtimeSummary = new RuntimeTrackedScanner()
        .scan(BillingWorkflowService.class, InventorySyncService.class);

    System.out.println("=== Runtime scan ===");
    print(runtimeSummary.getComponents());

    System.out.println();
    System.out.println("=== Generated index ===");
    print(new GeneratedIndexReader().readEntries());
  }

  private static void print(List<TrackedComponentInfo> components) {
    if (components.isEmpty()) {
      System.out.println("No tracked components available.");
      return;
    }

    for (TrackedComponentInfo component : components) {
      System.out.println(component.getClassName()
          + " | domain=" + component.getDomain()
          + " | owner=" + component.getOwner());
      for (String operation : component.getOperations()) {
        System.out.println("  - " + operation);
      }
    }
  }
}
