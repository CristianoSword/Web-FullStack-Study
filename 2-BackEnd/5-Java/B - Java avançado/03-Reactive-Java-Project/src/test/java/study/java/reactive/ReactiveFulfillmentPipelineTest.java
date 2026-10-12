package study.java.reactive;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;
import org.junit.jupiter.api.Test;
import reactor.test.StepVerifier;
import study.java.reactive.model.OrderCommand;
import study.java.reactive.model.PipelineReport;
import study.java.reactive.service.ReactiveFulfillmentPipeline;

class ReactiveFulfillmentPipelineTest {

  @Test
  void shouldProcessValidOrdersAndSendInvalidToDeadLetter() {
    ReactiveFulfillmentPipeline pipeline = new ReactiveFulfillmentPipeline();

    StepVerifier.create(pipeline.processBatch(Arrays.asList(
            new OrderCommand("ORD-1", "enterprise", 4, 20.0, true),
            new OrderCommand("ORD-2", "standard", 0, 15.0, true),
            new OrderCommand("ORD-3", "pro", 2, 12.0, true))))
        .assertNext(report -> {
          assertEquals(2, report.getProcessedCount());
          assertEquals(1, report.getFailedCount());
          assertEquals("ORD-2", report.getDeadLetters().get(0).getOrderId());
        })
        .verifyComplete();
  }

  @Test
  void shouldAllowMultipleBatchesWithSamePipelineInstance() {
    ReactiveFulfillmentPipeline pipeline = new ReactiveFulfillmentPipeline();

    StepVerifier.create(pipeline.processBatch(Arrays.asList(
            new OrderCommand("ORD-10", "pro", 1, 99.0, true))))
        .assertNext(report -> assertEquals(1, report.getProcessedCount()))
        .expectComplete()
        .verify();

    StepVerifier.create(pipeline.processBatch(Arrays.asList(
            new OrderCommand("ORD-11", "standard", 1, 49.0, true))))
        .assertNext(report -> assertEquals(1, report.getProcessedCount()))
        .verifyComplete();
  }
}
