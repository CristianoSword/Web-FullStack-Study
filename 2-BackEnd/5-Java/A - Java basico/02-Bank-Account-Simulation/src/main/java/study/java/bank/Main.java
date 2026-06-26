package study.java.bank;

public class Main {
  public static void main(String[] args) {
    Account maria = new Account("Maria", 1000);
    Account joao = new Account("Joao", 500);
    TransferReceipt receipt = new BankService().transfer(maria, joao, 120);
    System.out.println(receipt.amount());
  }
}
