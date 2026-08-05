defmodule SupervisorTreeRecovery.WorkerSupervisor do
  use DynamicSupervisor

  alias SupervisorTreeRecovery.CrashyWorker

  def start_link(_opts) do
    DynamicSupervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def start_worker(worker_name) do
    child_spec = {CrashyWorker, worker_name: worker_name}
    DynamicSupervisor.start_child(__MODULE__, child_spec)
  end

  def ensure_worker_started(worker_name) do
    case start_worker(worker_name) do
      {:ok, pid} -> {:ok, pid}
      {:error, {:already_started, pid}} -> {:ok, pid}
      {:error, {:already_present, pid}} -> {:ok, pid}
      other -> other
    end
  end

  @impl true
  def init(:ok) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end
end
