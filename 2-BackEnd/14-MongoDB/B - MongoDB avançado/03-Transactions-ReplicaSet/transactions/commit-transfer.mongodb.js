const bank = db.getSiblingDB("bank_ops");
const session = db.getMongo().startSession();
const sessionDb = session.getDatabase("bank_ops");

const fromAccountId = "ACC-1001";
const toAccountId = "ACC-1002";
const amount = 250;
const transferId = "TRF-COMMIT-001";

try {
  session.startTransaction();

  const source = sessionDb.accounts.findOne({ accountId: fromAccountId });
  const target = sessionDb.accounts.findOne({ accountId: toAccountId });

  if (!source || !target) {
    throw new Error("Source or target account not found.");
  }

  if (source.balance < amount) {
    throw new Error("Insufficient funds for committed transfer.");
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

  sessionDb.audit_logs.insertOne({
    event: "transfer_committed",
    transferId,
    details: `Transferred ${amount} BRL from ${fromAccountId} to ${toAccountId}.`,
    createdAt: new Date()
  });

  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
