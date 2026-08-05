defmodule SupervisorTreeRecovery do
  alias SupervisorTreeRecovery.{CrashyWorker, Job, WorkerSupervisor}

  def run_demo(worker_name \\ "email-worker") do
    with {:ok, _pid} <- WorkerSupervisor.start_worker(worker_name),
         {:ok, _state} <-
           CrashyWorker.enqueue_job(
             worker_name,
             %Job{id: "job-001", type: :email_dispatch, payload: %{recipient: "ops@example.com"}}
           ),
         {:ok, _state} <- CrashyWorker.process_next(worker_name),
         {:error, :simulated_failure} <- CrashyWorker.crash(worker_name) do
      Process.sleep(25)
      {:ok, CrashyWorker.snapshot(worker_name)}
    end
  end

  def format_snapshot(snapshot) do
    [
      "Worker: #{snapshot.worker_name}",
      "Restarts: #{snapshot.restart_count}",
      "Status: #{snapshot.status}",
      "Processed jobs: #{length(snapshot.processed_jobs)}",
      "Pending jobs: #{length(snapshot.pending_jobs)}"
    ]
    |> Enum.join("\n")
  end

  def print_demo do
    case run_demo() do
      {:ok, snapshot} -> IO.puts(format_snapshot(snapshot))
      {:error, reason} -> IO.puts("recovery_demo_failed: #{inspect(reason)}")
    end
  end
end
