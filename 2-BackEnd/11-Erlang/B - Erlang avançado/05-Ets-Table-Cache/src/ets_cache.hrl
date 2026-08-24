-record(cache_entry, {
    key,
    value,
    expires_at
}).

-record(cache_metrics, {
    hits = 0,
    misses = 0,
    writes = 0,
    deletes = 0
}).
