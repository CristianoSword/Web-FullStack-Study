defmodule SupervisorTreeRecovery.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Registry, keys: :unique, name: SupervisorTreeRecovery.Registry},
      SupervisorTreeRecovery.RecoveryTracker,
      SupervisorTreeRecovery.WorkerSupervisor
    ]

    opts = [strategy: :one_for_one, name: SupervisorTreeRecovery.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
