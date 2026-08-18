-module(list_recursion_types).

-export_type([list_job/0, list_result/0]).

-include("list_recursion.hrl").

-type list_job() :: #list_job{}.
-type list_result() :: #list_result{}.
