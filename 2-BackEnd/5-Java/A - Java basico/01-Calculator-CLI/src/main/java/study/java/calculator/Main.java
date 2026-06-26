package study.java.calculator;

public class Main {
  public static void main(String[] args) {
    CalculatorService service = new CalculatorService();
    CalculationResult result = service.execute(Operation.ADD, 10, 5);
    System.out.println(result.value());
  }
}
