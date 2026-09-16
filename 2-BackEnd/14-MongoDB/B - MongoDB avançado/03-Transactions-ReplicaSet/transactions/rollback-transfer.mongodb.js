const bank = db.getSiblingDB("bank_ops");
const session = db.getMongo().startSession();
const sessionDb = session.getDatabase("bank_ops");

const fromAccountId = "ACC-1003";
const toAccountId = "ACC-1002";
const amount = 5000;
const transferId = "TRF-ROLLBACK-001";

try {
  session.startTransaction();

  const source = sessionDb.accounts.findOne({ accountId: fromAccountId });
  const target = sessionDb.accounts.findOne({ accountId: toAccountId });

  if (!source || !target) {
    throw new Error("Source or target account not found.");
  }

  if (source.balance < amount) {
    throw new Error("Insufficient funds. Transaction must be rolled back.");
  }

  sessionDb.accounts.updateOne(
    { accountId: fromAccountId },
    { $inc: { balance: -amount }, $set: { updatedAt: new Date() } }
  );

  sessionDb.accounts.updateOne(
    { accountId: toAccountId },
    { $inc: { balance: amount }, $set: { updatedAt: new Date() } }
  );

  sessionDb.transfers.insertOne({
    transferId,
    fromAccountId,
    toAccountId,
    amount,
    status: "committed",
    createdAt: new Date()
  });

  session.commitTransaction();
} catch (error) {
  session.abortTransaction();

  bank.audit_logs.insertOne({
    event: "transfer_rolled_back",
    transferId,
    details: error.message,
    createdAt: new Date()
  });

  bank.transfers.insertOne({
    transferId,
    fromAccountId,
    toAccountId,
    amount,
    status: "rolled_back",
    reason: error.message,
    createdAt: new Date()
  });
} finally {
  session.endSession();
}
