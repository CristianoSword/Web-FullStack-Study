-module(otp_genserver_ledger).
-behaviour(gen_server).

-export([
    start_link/0,
    open_account/2,
    deposit/2,
    withdraw/2,
    transfer/3,
    balance/1,
    snapshot/0,
    apply_batch/1
]).

-export([
    init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3
]).

-include_lib("eunit/include/eunit.hrl").
-include("otp_genserver.hrl").

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

open_account(AccountId, InitialBalance) ->
    gen_server:call(?MODULE, {open_account, AccountId, InitialBalance}).

deposit(AccountId, Amount) ->
    gen_server:call(?MODULE, {deposit, AccountId, Amount}).

withdraw(AccountId, Amount) ->
    gen_server:call(?MODULE, {withdraw, AccountId, Amount}).

transfer(FromId, ToId, Amount) ->
    gen_server:call(?MODULE, {transfer, FromId, ToId, Amount}).

balance(AccountId) ->
    gen_server:call(?MODULE, {balance, AccountId}).

snapshot() ->
    gen_server:call(?MODULE, snapshot).

apply_batch(Transactions) ->
    gen_server:call(?MODULE, {apply_batch, Transactions}).

init([]) ->
    {ok, #ledger_snapshot{accounts = #{}, processed = 0}}.

handle_call({open_account, AccountId, InitialBalance}, _From, State) ->
    case validate_account_payload(AccountId, InitialBalance) of
        ok ->
            Accounts = State#ledger_snapshot.accounts,
            case maps:is_key(AccountId, Accounts) of
                true ->
                    {reply, {error, account_exists}, State};
                false ->
                    Account = #account{id = AccountId, balance = InitialBalance},
                    NewAccounts = Accounts#{AccountId => Account},
                    {reply, {ok, Account}, State#ledger_snapshot{accounts = NewAccounts}}
            end;
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call({deposit, AccountId, Amount}, _From, State) ->
    case validate_amount(Amount) of
        ok ->
            update_account(AccountId, fun(Account) ->
                Updated = Account#account{balance = Account#account.balance + Amount},
                {{ok, Updated}, Updated}
            end, State);
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call({withdraw, AccountId, Amount}, _From, State) ->
    case validate_amount(Amount) of
        ok ->
            update_account(AccountId, fun(Account) ->
                Balance = Account#account.balance,
                case Balance >= Amount of
                    true ->
                        Updated = Account#account{balance = Balance - Amount},
                        {{ok, Updated}, Updated};
                    false ->
                        {{error, insufficient_funds}, Account}
                end
            end, State);
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call({transfer, FromId, ToId, Amount}, _From, State) ->
    case validate_transfer_payload(FromId, ToId, Amount) of
        ok ->
            case transfer_between_accounts(FromId, ToId, Amount, State) of
                {ok, FromAccount, ToAccount, NewState} ->
                    Reply = {ok, #{from => FromAccount, to => ToAccount}},
                    {reply, Reply, increment_processed(NewState)};
                {error, Reason, UnchangedState} ->
                    {reply, {error, Reason}, UnchangedState}
            end;
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call({balance, AccountId}, _From, State) ->
    case validate_account_id(AccountId) of
        ok ->
            Accounts = State#ledger_snapshot.accounts,
            case maps:get(AccountId, Accounts, undefined) of
                undefined ->
                    {reply, {error, account_not_found}, State};
                #account{balance = Balance} ->
                    {reply, {ok, Balance}, State}
            end;
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call(snapshot, _From, State) ->
    {reply, State, State};
handle_call({apply_batch, Transactions}, _From, State) ->
    case validate_transactions(Transactions) of
        ok ->
            {Reply, FinalState} = apply_batch_transactions(Transactions, [], State),
            {reply, Reply, FinalState};
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end;
handle_call(_Request, _From, State) ->
    {reply, {error, unsupported_call}, State}.

handle_cast(_Message, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVersion, State, _Extra) ->
    {ok, State}.

update_account(AccountId, Updater, State) ->
    case validate_account_id(AccountId) of
        ok ->
            Accounts = State#ledger_snapshot.accounts,
            case maps:get(AccountId, Accounts, undefined) of
                undefined ->
                    {reply, {error, account_not_found}, State};
                Account ->
                    {Reply, UpdatedAccount} = Updater(Account),
                    NewAccounts = Accounts#{AccountId => UpdatedAccount},
                    NewState = State#ledger_snapshot{accounts = NewAccounts},
                    case Reply of
                        {ok, _} ->
                            {reply, Reply, increment_processed(NewState)};
                        {error, _} ->
                            {reply, Reply, State}
                    end
            end
        ;
        {error, Reason} ->
            {reply, {error, Reason}, State}
    end.

transfer_between_accounts(FromId, ToId, Amount, State) ->
    Accounts = State#ledger_snapshot.accounts,
    case {maps:get(FromId, Accounts, undefined), maps:get(ToId, Accounts, undefined)} of
        {undefined, _} ->
            {error, from_account_not_found, State};
        {_, undefined} ->
            {error, to_account_not_found, State};
        {FromAccount, ToAccount} ->
            case FromAccount#account.balance >= Amount of
                true ->
                    UpdatedFrom = FromAccount#account{balance = FromAccount#account.balance - Amount},
                    UpdatedTo = ToAccount#account{balance = ToAccount#account.balance + Amount},
                    NewAccounts = Accounts#{FromId => UpdatedFrom, ToId => UpdatedTo},
                    NewState = State#ledger_snapshot{accounts = NewAccounts},
                    {ok, UpdatedFrom, UpdatedTo, NewState};
                false ->
                    {error, insufficient_funds, State}
            end
    end.

apply_batch_transactions([], Applied, State) ->
    {{ok, lists:reverse(Applied)}, State};
apply_batch_transactions([#transaction{from = FromId, to = ToId, amount = Amount} = Transaction | Rest], Applied, State) ->
    case transfer_between_accounts(FromId, ToId, Amount, State) of
        {ok, _FromAccount, _ToAccount, NewState} ->
            ProcessedState = increment_processed(NewState),
            apply_batch_transactions(Rest, [Transaction | Applied], ProcessedState);
        {error, Reason, FailedState} ->
            {{error, #{reason => Reason, applied => lists:reverse(Applied)}}, FailedState}
    end.

increment_processed(State) ->
    State#ledger_snapshot{processed = State#ledger_snapshot.processed + 1}.

validate_account_payload(AccountId, InitialBalance) ->
    case {validate_account_id(AccountId), is_number(InitialBalance) andalso InitialBalance >= 0} of
        {ok, true} ->
            ok;
        {ok, false} ->
            {error, invalid_initial_balance};
        {{error, Reason}, _} ->
            {error, Reason}
    end.

validate_transfer_payload(FromId, ToId, Amount) ->
    case {validate_account_id(FromId), validate_account_id(ToId), validate_amount(Amount)} of
        {ok, ok, ok} when FromId =:= ToId ->
            {error, same_account_transfer};
        {ok, ok, ok} ->
            ok;
        {{error, Reason}, _, _} ->
            {error, Reason};
        {_, {error, Reason}, _} ->
            {error, Reason};
        {_, _, {error, Reason}} ->
            {error, Reason}
    end.

validate_account_id(AccountId) when is_binary(AccountId), byte_size(AccountId) > 0 ->
    ok;
validate_account_id(_AccountId) ->
    {error, invalid_account_id}.

validate_amount(Amount) when is_number(Amount), Amount > 0 ->
    ok;
validate_amount(_Amount) ->
    {error, invalid_amount}.

validate_transactions([]) ->
    ok;
validate_transactions([#transaction{from = FromId, to = ToId, amount = Amount} | Rest]) ->
    case validate_transfer_payload(FromId, ToId, Amount) of
        ok ->
            validate_transactions(Rest);
        {error, Reason} ->
            {error, Reason}
    end;
validate_transactions([_Invalid | _Rest]) ->
    {error, invalid_transaction}.

ledger_flow_test() ->
    {ok, Pid} = start_link(),
    try
        ?assertMatch({ok, _}, open_account(<<"alice">>, 100)),
        ?assertMatch({ok, _}, open_account(<<"bob">>, 40)),
        ?assertMatch({ok, _}, deposit(<<"alice">>, 15)),
        ?assertMatch({ok, _}, transfer(<<"alice">>, <<"bob">>, 25)),
        ?assertEqual({ok, 90}, balance(<<"alice">>)),
        ?assertEqual({ok, 65}, balance(<<"bob">>)),
        Snapshot = snapshot(),
        ?assertEqual(2, maps:size(Snapshot#ledger_snapshot.accounts)),
        ?assertEqual(2, Snapshot#ledger_snapshot.processed)
    after
        gen_server:stop(Pid)
    end.

batch_validation_test() ->
    {ok, Pid} = start_link(),
    try
        ?assertMatch({ok, _}, open_account(<<"alice">>, 100)),
        ?assertMatch({ok, _}, open_account(<<"bob">>, 20)),
        ?assertEqual(
            {error, invalid_transaction},
            apply_batch([invalid])
        ),
        ?assertEqual(
            {error, same_account_transfer},
            apply_batch([#transaction{from = <<"alice">>, to = <<"alice">>, amount = 10}])
        )
    after
        gen_server:stop(Pid)
    end.

invalid_payload_test() ->
    {ok, Pid} = start_link(),
    try
        ?assertEqual({error, invalid_account_id}, open_account(<<>>, 10)),
        ?assertEqual({error, invalid_initial_balance}, open_account(<<"alice">>, -1)),
        ?assertEqual({error, invalid_amount}, deposit(<<"alice">>, 0))
    after
        gen_server:stop(Pid)
    end.
