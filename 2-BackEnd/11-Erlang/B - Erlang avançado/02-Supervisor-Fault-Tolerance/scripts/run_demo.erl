-module(run_demo).

-export([main/0]).

main() ->
    {ok, SupPid} = fault_tolerance_sup:start_link(),
    fault_tolerance_control:ping(),
    BeforePid = fault_tolerance_control:worker_pid(),
    Report = fault_tolerance_control:crash_and_wait_restart(),
    AfterPid = fault_tolerance_control:worker_pid(),
    io:format("~p~n", [{before, BeforePid}]),
    io:format("~p~n", [Report]),
    io:format("~p~n", [{'after', AfterPid, fault_tolerance_control:status()}]),
    unlink(SupPid),
    exit(SupPid, shutdown),
    init:stop().
