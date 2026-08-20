-record(worker_status, {
    name,
    crash_count = 0,
    heartbeat = 0
}).

-record(restart_report, {
    before_pid,
    after_pid,
    crashed = false
}).
