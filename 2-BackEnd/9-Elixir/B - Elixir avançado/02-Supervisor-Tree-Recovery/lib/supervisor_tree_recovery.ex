defmodule SupervisorTreeRecovery do
  alias SupervisorTreeRecovery.{CrashyWorker, Job, Validator, WorkerSupervisor}

  def start_worker(worker_name) do
    with :ok <- Validator.validate_worker_name(worker_name) do
      WorkerSupervisor.ensure_worker_started(worker_name)
    end
  end

  def enqueue_job(worker_name, %Job{} = job) do
    with :ok <- Validator.validate_worker_name(worker_name),
         :ok <- Validator.validate_job(job) do
      CrashyWorker.enqueue_job(worker_name, job)
    end
  end

  def run_demo(worker_name \\ "email-worker") do
    with {:ok, _pid} <- start_worker(worker_name),
         {:ok, _state} <-
           enqueue_job(
             worker_name,
             %Job{id: "job-001", type: :email_dispatch, payload: %{recipient: "ops@example.com"}}
           ),
         {:ok, _state} <- CrashyWorker.process_next(worker_name),
         {:error, :simulated_failure} <- CrashyWorker.crash(worker_name),
         :ok <- await_worker(worker_name, 8) do
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

  defp await_worker(_worker_name, 0), do: {:error, :worker_not_recovered}

  defp await_worker(worker_name, attempts) do
    case Registry.lookup(SupervisorTreeRecovery.Registry, worker_name) do
      [{_pid, _meta}] ->
        :ok

      [] ->
        Process.sleep(20)
        await_worker(worker_name, attempts - 1)
    end
  end
end
