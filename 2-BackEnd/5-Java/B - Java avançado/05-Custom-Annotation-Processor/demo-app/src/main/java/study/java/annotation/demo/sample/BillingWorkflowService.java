package study.java.annotation.demo.sample;

import study.java.annotation.api.TrackedComponent;
import study.java.annotation.api.TrackedOperation;

@TrackedComponent(domain = "billing", owner = "payments-platform")
public class BillingWorkflowService {

  @TrackedOperation(value = "invoice.issue", critical = true)
  public void issueInvoice() {
    // runtime demo only
  }

  @TrackedOperation(value = "invoice.send-email")
  public void sendInvoiceEmail() {
    // runtime demo only
  }
}
