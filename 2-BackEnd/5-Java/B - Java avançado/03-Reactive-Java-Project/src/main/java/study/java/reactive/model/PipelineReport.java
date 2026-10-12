package study.java.reactive.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PipelineReport {

  private final List<EnrichedOrder> processedOrders;
  private final List<DeadLetterEvent> deadLetters;

  public PipelineReport(List<EnrichedOrder> processedOrders, List<DeadLetterEvent> deadLetters) {
    this.processedOrders = Collections.unmodifiableList(new ArrayList<EnrichedOrder>(processedOrders));
    this.deadLetters = Collections.unmodifiableList(new ArrayList<DeadLetterEvent>(deadLetters));
  }

  public List<EnrichedOrder> getProcessedOrders() {
    return processedOrders;
  }

  public List<DeadLetterEvent> getDeadLetters() {
    return deadLetters;
  }

  public int getProcessedCount() {
    return processedOrders.size();
  }

  public int getFailedCount() {
    return deadLetters.size();
  }
}
