-module(run_demo).

-export([main/0]).

-include("otp_genserver.hrl").

main() ->
    {ok, SupPid} = otp_genserver_sup:start_link(),
    ok = setup_demo_accounts(),
    ok = run_demo_transactions(),
    io:format("~p~n", [otp_genserver_ledger:snapshot()]),
    exit(SupPid, shutdown),
    init:stop().

setup_demo_accounts() ->
    {ok, _} = otp_genserver_ledger:open_account(<<"alice">>, 150),
    {ok, _} = otp_genserver_ledger:open_account(<<"bob">>, 40),
    {ok, _} = otp_genserver_ledger:open_account(<<"carol">>, 10),
    ok.

run_demo_transactions() ->
    {ok, _} = otp_genserver_ledger:deposit(<<"carol">>, 15),
    {ok, _} = otp_genserver_ledger:transfer(<<"alice">>, <<"bob">>, 35),
    {ok, _} = otp_genserver_ledger:withdraw(<<"bob">>, 5),
    {ok, _} = otp_genserver_ledger:apply_batch([
        #transaction{from = <<"alice">>, to = <<"carol">>, amount = 20},
        #transaction{from = <<"carol">>, to = <<"bob">>, amount = 10}
    ]),
    ok.
