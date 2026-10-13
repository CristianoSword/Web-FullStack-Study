package study.java.annotation.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import study.java.annotation.demo.model.TrackingSummary;
import study.java.annotation.demo.sample.BillingWorkflowService;
import study.java.annotation.demo.sample.InventorySyncService;
import study.java.annotation.demo.service.RuntimeTrackedScanner;

class RuntimeTrackedScannerTest {

  @Test
  void shouldScanAnnotatedComponents() {
    TrackingSummary summary = new RuntimeTrackedScanner()
        .scan(BillingWorkflowService.class, InventorySyncService.class);

    assertEquals(2, summary.getComponentCount());
    assertTrue(summary.getComponents().get(0).getOperations().size() >= 2);
  }
}
