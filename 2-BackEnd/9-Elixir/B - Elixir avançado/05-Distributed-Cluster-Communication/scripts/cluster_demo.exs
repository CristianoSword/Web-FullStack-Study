peer_nodes =
  System.argv()
  |> Enum.map(&String.to_atom/1)

DistributedClusterCommunication.print_demo(peer_nodes)
