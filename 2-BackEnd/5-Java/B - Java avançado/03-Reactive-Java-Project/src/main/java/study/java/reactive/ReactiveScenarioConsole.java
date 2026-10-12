package study.java.reactive;

import java.util.Arrays;
import java.util.List;
import study.java.reactive.model.DeadLetterEvent;
import study.java.reactive.model.EnrichedOrder;
import study.java.reactive.model.OrderCommand;
import study.java.reactive.model.PipelineReport;

public class ReactiveScenarioConsole {

  public List<OrderCommand> demoCommands() {
    return Arrays.asList(
        new OrderCommand("ORD-1001", "enterprise", 12, 49.9, true),
        new OrderCommand("ORD-1002", "pro", 3, 19.5, true),
        new OrderCommand("ORD-1003", "standard", 0, 15.0, true),
        new OrderCommand("ORD-1004", "standard", 2, 9.9, false));
  }

  public void printReport(PipelineReport report) {
    System.out.println("=== Reactive Fulfillment Report ===");
    System.out.println("Processed orders: " + report.getProcessedCount());
    System.out.println("Failed orders: " + report.getFailedCount());
    System.out.println();

    for (EnrichedOrder order : report.getProcessedOrders()) {
      System.out.println(String.format(
          "OK %s | reservation=%s | subtotal=%.2f | discount=%.2f%% | final=%.2f",
          order.getOrderId(),
          order.getReservationId(),
          order.getSubtotal(),
          order.getDiscountRate() * 100,
          order.getFinalAmount()));
    }

    if (!report.getDeadLetters().isEmpty()) {
      System.out.println();
      System.out.println("Dead-letter events:");
      for (DeadLetterEvent deadLetter : report.getDeadLetters()) {
        System.out.println(String.format(
            "- %s | %s | %s",
            deadLetter.getOrderId(),
            deadLetter.getReason(),
            deadLetter.getFailedAt()));
      }
    }
  }
}
