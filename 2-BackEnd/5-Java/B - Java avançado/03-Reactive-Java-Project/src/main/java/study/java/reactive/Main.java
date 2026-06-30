package study.java.reactive;

public class Main {
  public static void main(String[] args) {
    EventPayload payload = new EventPayload("reactive");
    if (!new EventValidator().isValid(payload)) {
      throw new IllegalArgumentException("invalid event");
    }

    PipelineResult result = new ReactivePipeline().process(payload).join();
    System.out.println(result.value());
  }
}
