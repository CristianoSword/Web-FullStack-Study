-module(fault_tolerance_control).

-export([
    worker_pid/0,
    status/0,
    ping/0,
    crash_and_wait_restart/0
]).

-include("fault_tolerance.hrl").

worker_pid() ->
    whereis(fault_tolerance_worker).

status() ->
    fault_tolerance_worker:status().

ping() ->
    fault_tolerance_worker:ping().

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
