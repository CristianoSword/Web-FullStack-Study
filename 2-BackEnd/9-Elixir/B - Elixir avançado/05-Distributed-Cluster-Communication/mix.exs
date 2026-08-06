defmodule DistributedClusterCommunication.MixProject do
  use Mix.Project

  def project do
    [
      app: :distributed_cluster_communication,
      version: "0.1.0",
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
      deps: []
    ]
  end

  def application do
    [
      mod: {DistributedClusterCommunication.Application, []},
      extra_applications: [:logger]
    ]
  end
end
