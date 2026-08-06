defmodule DistributedClusterCommunication.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      DistributedClusterCommunication.ClusterServer
    ]

    opts = [strategy: :one_for_one, name: DistributedClusterCommunication.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
