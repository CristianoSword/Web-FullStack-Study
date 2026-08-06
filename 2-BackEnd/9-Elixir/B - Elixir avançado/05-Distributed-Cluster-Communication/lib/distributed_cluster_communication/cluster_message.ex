defmodule DistributedClusterCommunication.ClusterMessage do
  @enforce_keys [:topic, :payload, :origin_node]
  defstruct topic: nil,
            payload: %{},
            origin_node: nil,
            inserted_at: nil
end
