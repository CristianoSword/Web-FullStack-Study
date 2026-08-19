-record(bootstrap_target, {
    name,
    src_dir,
    module
}).

-record(bootstrap_report, {
    app_name,
    targets = [],
    notes = []
}).
