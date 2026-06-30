package study.java.reactive;

public class Main {
  public static void main(String[] args) {
    PipelineResult result = new ReactivePipeline().process(new EventPayload("reactive")).join();
    System.out.println(result.value());
  }
}
