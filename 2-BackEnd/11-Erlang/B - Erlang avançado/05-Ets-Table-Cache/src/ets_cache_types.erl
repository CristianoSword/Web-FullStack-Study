-module(ets_cache_types).

-export_type([
    cache_entry/0,
    cache_metrics/0
]).

-include("ets_cache.hrl").

-type cache_entry() :: #cache_entry{}.
-type cache_metrics() :: #cache_metrics{}.
