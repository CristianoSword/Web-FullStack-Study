-record(list_job, {
    label,
    numbers = []
}).

-record(list_result, {
    total = 0,
    reversed = [],
    evens = [],
    doubled = []
}).
