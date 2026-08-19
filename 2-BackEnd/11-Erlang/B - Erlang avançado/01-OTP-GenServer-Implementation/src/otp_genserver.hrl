-record(account, {
    id,
    balance = 0
}).

-record(transaction, {
    from,
    to,
    amount = 0
}).

-record(ledger_snapshot, {
    accounts = #{},
    processed = 0
}).
