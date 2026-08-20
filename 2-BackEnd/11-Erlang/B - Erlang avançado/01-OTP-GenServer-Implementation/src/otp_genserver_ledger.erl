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
    Accounts = State#ledger_snapshot.accounts,
    case maps:is_key(AccountId, Accounts) of
        true ->
            {reply, {error, account_exists}, State};
        false ->
            Account = #account{id = AccountId, balance = InitialBalance},
            NewAccounts = Accounts#{AccountId => Account},
            {reply, {ok, Account}, State#ledger_snapshot{accounts = NewAccounts}}
    end;
handle_call({deposit, AccountId, Amount}, _From, State) ->
    update_account(AccountId, fun(Account) ->
        Updated = Account#account{balance = Account#account.balance + Amount},
        {{ok, Updated}, Updated}
    end, State);
handle_call({withdraw, AccountId, Amount}, _From, State) ->
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
handle_call({transfer, FromId, ToId, Amount}, _From, State) ->
    case transfer_between_accounts(FromId, ToId, Amount, State) of
        {ok, FromAccount, ToAccount, NewState} ->
            Reply = {ok, #{from => FromAccount, to => ToAccount}},
            {reply, Reply, increment_processed(NewState)};
        {error, Reason, UnchangedState} ->
            {reply, {error, Reason}, UnchangedState}
    end;
handle_call({balance, AccountId}, _From, State) ->
    Accounts = State#ledger_snapshot.accounts,
    case maps:get(AccountId, Accounts, undefined) of
        undefined ->
            {reply, {error, account_not_found}, State};
        #account{balance = Balance} ->
            {reply, {ok, Balance}, State}
    end;
handle_call(snapshot, _From, State) ->
    {reply, State, State};
handle_call({apply_batch, Transactions}, _From, State) ->
    {Reply, FinalState} = apply_batch_transactions(Transactions, [], State),
    {reply, Reply, FinalState};
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
