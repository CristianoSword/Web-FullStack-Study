-module(otp_genserver_types).

-export_type([
    account/0,
    transaction/0,
    ledger_snapshot/0
]).

-include("otp_genserver.hrl").

-type account() :: #account{}.
-type transaction() :: #transaction{}.
-type ledger_snapshot() :: #ledger_snapshot{}.
