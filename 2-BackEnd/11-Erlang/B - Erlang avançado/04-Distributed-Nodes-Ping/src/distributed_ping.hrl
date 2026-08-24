-record(node_target, {
    name,
    full_node,
    controller
}).

-record(ping_result, {
    from,
    to,
    status
}).

-record(cluster_report, {
    origin_node,
    peers = [],
    results = []
}).
