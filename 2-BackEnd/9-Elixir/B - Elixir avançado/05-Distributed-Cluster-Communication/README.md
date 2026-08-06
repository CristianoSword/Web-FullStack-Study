# Distributed Cluster Communication

Source-complete Elixir project for direct node-to-node communication in a cluster. The project demonstrates `Node.connect/1`, remote procedure calls with `:rpc.call/4`, and local message replication into a supervised cluster server.

## Structure

- `mix.exs`: Mix application definition.
- `lib/distributed_cluster_communication/application.ex`: root supervision tree.
- `lib/distributed_cluster_communication/node_peer.ex`: peer model for tracked nodes.
- `lib/distributed_cluster_communication/cluster_message.ex`: replicated cluster message model.
- `lib/distributed_cluster_communication/cluster_snapshot.ex`: node snapshot payload.
- `lib/distributed_cluster_communication/cluster_server.ex`: supervised `GenServer` that manages peers, inbox and RPC sync.
- `lib/distributed_cluster_communication/validator.ex`: validation for node names, topics and payloads.
- `lib/distributed_cluster_communication.ex`: public API for peer connection, broadcasting and report printing.
- `scripts/cluster_demo.exs`: command-line demo entrypoint.

## Features

- direct peer connection through `Node.connect/1`
- remote delivery with `:rpc.call/4`
- local inbox replication of cluster events
- snapshot sync across connected nodes
- validation for node names, topics and payloads

## Run

Start named nodes in separate terminals:

```bash
iex --sname node_a -S mix
iex --sname node_b -S mix
```

Then run the demo from one node:

```bash
mix run scripts/cluster_demo.exs node_b@your-host
```

Useful functions from `iex -S mix`:

```elixir
DistributedClusterCommunication.connect_peers([:"node_b@your-host"])
DistributedClusterCommunication.announce_deployment("deployments", %{service: "chat-api"})
DistributedClusterCommunication.cluster_report()
```

## Validation

The local environment does not currently include the Elixir SDK, so this project was validated statically:

- cluster server API and supervision wiring reviewed for consistency
- `Node.connect/1` and `:rpc.call/4` are represented concretely in source
- public demo flow maps to real modules and script files
- README instructions match the implemented entrypoints
