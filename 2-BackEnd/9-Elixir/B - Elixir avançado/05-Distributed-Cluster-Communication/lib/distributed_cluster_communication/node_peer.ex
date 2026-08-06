defmodule DistributedClusterCommunication.NodePeer do
  @enforce_keys [:name]
  defstruct name: nil,
            status: :disconnected,
            last_seen_at: nil
end
