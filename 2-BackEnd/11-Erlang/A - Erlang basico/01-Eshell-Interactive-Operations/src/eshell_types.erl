-module(eshell_types).

-export_type([operation_session/0]).

-include("eshell_operations.hrl").

-type operation_session() :: #operation_session{}.
