-module(distributed_ping_types).

-export_type([
    node_target/0,
    ping_result/0,
    cluster_report/0
]).

-include("distributed_ping.hrl").

-type node_target() :: #node_target{}.
-type ping_result() :: #ping_result{}.
-type cluster_report() :: #cluster_report{}.
