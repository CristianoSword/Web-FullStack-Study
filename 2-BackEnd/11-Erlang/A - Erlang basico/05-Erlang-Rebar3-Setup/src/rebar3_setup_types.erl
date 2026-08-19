-module(rebar3_setup_types).

-export_type([
    bootstrap_target/0,
    bootstrap_report/0
]).

-include("rebar3_setup.hrl").

-type bootstrap_target() :: #bootstrap_target{}.
-type bootstrap_report() :: #bootstrap_report{}.
