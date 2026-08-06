defmodule DistributedClusterCommunication do
  alias DistributedClusterCommunication.ClusterServer

  def connect_peers(peer_nodes) when is_list(peer_nodes) do
    Enum.map(peer_nodes, &ClusterServer.connect_peer/1)
  end

  def announce_deployment(topic \\ "deployments", payload \\ %{status: "green"}) do
    ClusterServer.broadcast(topic, payload)
  end

  def cluster_report do
    %{
      local_snapshot: ClusterServer.snapshot(),
      remote_snapshots: ClusterServer.sync_with_peers()
    }
  end

  def print_demo(peer_nodes \\ []) do
    connect_peers(peer_nodes)
    announce_deployment("deployments", %{service: "chat-api", status: "healthy"})

    report = cluster_report()

    IO.puts("Node: #{report.local_snapshot.node_name}")
    IO.puts("Connected nodes: #{Enum.join(Enum.map(report.local_snapshot.connected_nodes, &to_string/1), ", ")}")
    IO.puts("Local inbox: #{length(report.local_snapshot.inbox)} messages")
    IO.puts("Remote sync: #{inspect(report.remote_snapshots)}")
  end
end
