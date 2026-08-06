defmodule DistributedClusterCommunication.ClusterSnapshot do
  @enforce_keys [:node_name]
  defstruct node_name: nil,
            connected_nodes: [],
            inbox: [],
            peers: []
end
