package study.java.reactive;

import java.util.List;
import study.java.reactive.model.OrderCommand;
import study.java.reactive.model.PipelineReport;
import study.java.reactive.service.ReactiveFulfillmentPipeline;

public class Main {

  public static void main(String[] args) {
    ReactiveScenarioConsole console = new ReactiveScenarioConsole();
    List<OrderCommand> commands = console.demoCommands();

    if (args.length > 0 && "--success-only".equals(args[0])) {
      commands = commands.subList(0, 2);
    }

    PipelineReport report = new ReactiveFulfillmentPipeline()
        .processBatch(commands)
        .block();

    if (report == null) {
      throw new IllegalStateException("pipeline did not produce a report");
    }

    console.printReport(report);
  }
}
