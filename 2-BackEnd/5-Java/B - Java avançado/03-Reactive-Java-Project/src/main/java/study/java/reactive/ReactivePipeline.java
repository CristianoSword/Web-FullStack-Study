package study.java.reactive;

import java.util.concurrent.CompletableFuture;

public class ReactivePipeline {
  public CompletableFuture<PipelineResult> process(EventPayload payload) {
    return CompletableFuture.completedFuture(new PipelineResult(payload.value().toUpperCase()));
  }
}
