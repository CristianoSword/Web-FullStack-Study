package study.java.annotation.demo.sample;

import study.java.annotation.api.TrackedComponent;
import study.java.annotation.api.TrackedOperation;

@TrackedComponent(domain = "inventory", owner = "catalog-core")
public class InventorySyncService {

  @TrackedOperation(value = "stock.sync", critical = true)
  public void syncStock() {
    // runtime demo only
  }

  @TrackedOperation(value = "stock.reconcile")
  public void reconcileDifferences() {
    // runtime demo only
  }
}
