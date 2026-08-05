defmodule SupervisorTreeRecovery.WorkerSnapshot do
  @enforce_keys [:worker_name]
  defstruct worker_name: nil,
            processed_jobs: [],
            pending_jobs: [],
            restart_count: 0,
            status: :idle
end
