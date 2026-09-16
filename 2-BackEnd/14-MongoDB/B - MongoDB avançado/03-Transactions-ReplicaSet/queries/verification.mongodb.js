const bank = db.getSiblingDB("bank_ops");

print("Replica set:");
printjson(rs.status().members.map(member => ({
  name: member.name,
  stateStr: member.stateStr
})));

print("Accounts:");
printjson(
  bank.accounts.find(
    {},
    { _id: 0, accountId: 1, owner: 1, balance: 1, status: 1 }
  ).sort({ accountId: 1 }).toArray()
);

print("Transfers:");
printjson(
  bank.transfers.find(
    {},
    { _id: 0, transferId: 1, fromAccountId: 1, toAccountId: 1, amount: 1, status: 1, reason: 1 }
  ).sort({ createdAt: -1 }).toArray()
);

print("Audit logs:");
printjson(
  bank.audit_logs.find(
    {},
    { _id: 0, event: 1, transferId: 1, details: 1, createdAt: 1 }
  ).sort({ createdAt: -1 }).limit(10).toArray()
);
