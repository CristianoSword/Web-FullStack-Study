package study.java.calculator;

public class CalculatorService {
  public CalculationResult execute(Operation operation, double left, double right) {
    return switch (operation) {
      case ADD -> new CalculationResult(left + right);
      case SUBTRACT -> new CalculationResult(left - right);
    };
  }
}
