# Supervisor Tree Recovery

OTP project that demonstrates supervision-tree recovery with restartable workers. A `DynamicSupervisor` manages named `GenServer` workers, a tracker counts restarts, and a demo flow intentionally crashes a worker to show recovery.

## Structure

- `mix.exs`: Mix project configuration.
- `lib/supervisor_tree_recovery/application.ex`: root supervision tree.
- `lib/supervisor_tree_recovery/job.ex`: job model queued by workers.
- `lib/supervisor_tree_recovery/worker_snapshot.ex`: serializable worker state.
- `lib/supervisor_tree_recovery/recovery_tracker.ex`: restart counter process.
- `lib/supervisor_tree_recovery/worker_supervisor.ex`: `DynamicSupervisor` wrapper.
- `lib/supervisor_tree_recovery/crashy_worker.ex`: worker `GenServer` that can process jobs and simulate failure.
- `lib/supervisor_tree_recovery/validator.ex`: validation for worker names and jobs.
- `lib/supervisor_tree_recovery.ex`: public API and recovery demo.
- `scripts/recovery_demo.exs`: `mix run` entrypoint.

## Features

- named workers registered through `Registry`
- `DynamicSupervisor` child startup and restart lifecycle
- job queue and processed-job tracking
- explicit crash path for restart demonstrations
- restart counting through a dedicated tracker process
- validation for worker names, job ids, job types and payloads

## Run

```bash
mix run scripts/recovery_demo.exs
```

Useful functions from `iex -S mix`:

```elixir
SupervisorTreeRecovery.start_worker("email-worker")
SupervisorTreeRecovery.run_demo("email-worker")
SupervisorTreeRecovery.CrashyWorker.snapshot("email-worker")
```

## Validation

The local machine does not currently provide the Elixir SDK, so validation for this project was static:

- supervision tree and worker lifecycle reviewed for coherence
- registry names and public API modules matched across files
- restart-count flow aligned with the crash-and-recover demo
- README commands mapped to actual source files
