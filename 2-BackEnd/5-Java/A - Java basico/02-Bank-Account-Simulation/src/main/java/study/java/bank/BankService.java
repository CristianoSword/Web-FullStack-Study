package study.java.bank;

public class BankService {
  public TransferReceipt transfer(Account from, Account to, double amount) {
    return new TransferReceipt(amount);
  }
}
