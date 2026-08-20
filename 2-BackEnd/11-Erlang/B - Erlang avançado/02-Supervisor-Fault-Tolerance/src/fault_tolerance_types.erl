-module(fault_tolerance_types).

-export_type([
    worker_status/0,
    restart_report/0
]).

-include("fault_tolerance.hrl").

-type worker_status() :: #worker_status{}.
-type restart_report() :: #restart_report{}.
