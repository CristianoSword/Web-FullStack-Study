defmodule SupervisorTreeRecovery.CrashyWorker do
  use GenServer, restart: :permanent

  alias SupervisorTreeRecovery.{Job, RecoveryTracker, WorkerSnapshot}

  def child_spec(opts) do
    worker_name = Keyword.fetch!(opts, :worker_name)

    %{
      id: {:crashy_worker, worker_name},
      start: {__MODULE__, :start_link, [opts]},
      restart: :permanent
    }
  end

  def start_link(opts) do
    worker_name = Keyword.fetch!(opts, :worker_name)
    GenServer.start_link(__MODULE__, opts, name: via(worker_name))
  end

  def enqueue_job(worker_name, %Job{} = job) do
    GenServer.call(via(worker_name), {:enqueue_job, job})
  end

  def process_next(worker_name) do
    GenServer.call(via(worker_name), :process_next)
  end

  def crash(worker_name) do
    GenServer.call(via(worker_name), :crash)
  end

  def snapshot(worker_name) do
    GenServer.call(via(worker_name), :snapshot)
  end

  @impl true
  def init(opts) do
    worker_name = Keyword.fetch!(opts, :worker_name)
    restart_count = RecoveryTracker.bump(worker_name)

    state = %WorkerSnapshot{
      worker_name: worker_name,
      restart_count: restart_count,
      status: :idle
    }

    {:ok, state}
  end

  @impl true
  def handle_call({:enqueue_job, job}, _from, %WorkerSnapshot{} = state) do
    updated_state = %WorkerSnapshot{state | pending_jobs: state.pending_jobs ++ [job], status: :queued}
    {:reply, {:ok, updated_state}, updated_state}
  end

  def handle_call(:process_next, _from, %WorkerSnapshot{pending_jobs: []} = state) do
    {:reply, {:error, :no_jobs_pending}, state}
  end

  def handle_call(:process_next, _from, %WorkerSnapshot{pending_jobs: [job | tail]} = state) do
    updated_state = %WorkerSnapshot{
      state
      | pending_jobs: tail,
        processed_jobs: state.processed_jobs ++ [job],
        status: if(tail == [], do: :idle, else: :queued)
    }

    {:reply, {:ok, updated_state}, updated_state}
  end

  def handle_call(:crash, _from, state) do
    {:stop, :simulated_failure, {:error, :simulated_failure}, state}
  end

  def handle_call(:snapshot, _from, state) do
    refreshed_state = %WorkerSnapshot{
      state
      | restart_count: RecoveryTracker.count(state.worker_name)
    }

    {:reply, refreshed_state, refreshed_state}
  end

  defp via(worker_name) do
    {:via, Registry, {SupervisorTreeRecovery.Registry, worker_name}}
  end
end
