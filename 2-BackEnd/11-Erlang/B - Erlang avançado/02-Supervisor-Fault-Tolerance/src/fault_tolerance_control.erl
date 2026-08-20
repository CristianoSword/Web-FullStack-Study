-module(fault_tolerance_control).

-export([
    worker_pid/0,
    status/0,
    ping/0,
    crash_and_wait_restart/0,
    reset_metrics/0
]).

-include_lib("eunit/include/eunit.hrl").
-include("fault_tolerance.hrl").

worker_pid() ->
    whereis(fault_tolerance_worker).

status() ->
    fault_tolerance_worker:status().

ping() ->
    fault_tolerance_worker:ping().

reset_metrics() ->
    fault_tolerance_worker:reset_crash_counter().

crash_and_wait_restart() ->
    BeforePid = worker_pid(),
    spawn(fun() -> catch fault_tolerance_worker:crash() end),
    wait_for_restart(BeforePid, 20).

wait_for_restart(BeforePid, 0) ->
    #restart_report{before_pid = BeforePid, after_pid = worker_pid(), crashed = false};
wait_for_restart(BeforePid, AttemptsLeft) ->
    timer:sleep(50),
    CurrentPid = worker_pid(),
    case CurrentPid =/= undefined andalso CurrentPid =/= BeforePid of
        true ->
            #restart_report{before_pid = BeforePid, after_pid = CurrentPid, crashed = true};
        false ->
            wait_for_restart(BeforePid, AttemptsLeft - 1)
    end.

restart_report_test() ->
    {ok, SupPid} = fault_tolerance_sup:start_link(),
    try
        ok = reset_metrics(),
        BeforePid = worker_pid(),
        pong = ping(),
        Report = crash_and_wait_restart(),
        Status = status(),
        ?assertEqual(true, Report#restart_report.crashed),
        ?assertEqual(BeforePid, Report#restart_report.before_pid),
        ?assert(Report#restart_report.after_pid =/= BeforePid),
        ?assertEqual(1, Status#worker_status.crash_count),
        ?assertEqual(0, Status#worker_status.heartbeat)
    after
        unlink(SupPid),
        exit(SupPid, shutdown)
    end.

heartbeat_test() ->
    {ok, SupPid} = fault_tolerance_sup:start_link(),
    try
        ok = reset_metrics(),
        pong = ping(),
        pong = ping(),
        Status = status(),
        ?assertEqual(2, Status#worker_status.heartbeat)
    after
        unlink(SupPid),
        exit(SupPid, shutdown)
    end.
