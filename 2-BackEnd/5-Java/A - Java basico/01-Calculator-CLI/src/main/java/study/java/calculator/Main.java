package study.java.calculator;

public class Main {
  public static void main(String[] args) {
    InputValidator validator = new InputValidator();
    if (!validator.isFinite(10) || !validator.isFinite(5)) {
      throw new IllegalArgumentException("invalid input");
    }

    CalculatorService service = new CalculatorService();
    CalculationResult result = service.execute(Operation.ADD, 10, 5);
    System.out.println(result.value());
  }
}
