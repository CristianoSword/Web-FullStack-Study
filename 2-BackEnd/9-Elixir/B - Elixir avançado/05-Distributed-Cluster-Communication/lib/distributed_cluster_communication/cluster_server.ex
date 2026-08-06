defmodule DistributedClusterCommunication.ClusterServer do
  use GenServer

  alias DistributedClusterCommunication.{ClusterMessage, ClusterSnapshot, NodePeer}

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def connect_peer(node_name) do
    GenServer.call(__MODULE__, {:connect_peer, node_name})
  end

  def broadcast(topic, payload) do
    GenServer.call(__MODULE__, {:broadcast, topic, payload})
  end

  def receive_remote(%ClusterMessage{} = message) do
    GenServer.call(__MODULE__, {:receive_remote, message})
  end

  def snapshot do
    GenServer.call(__MODULE__, :snapshot)
  end

  def sync_with_peers do
    GenServer.call(__MODULE__, :sync_with_peers)
  end

  @impl true
  def init(_state) do
    {:ok, %{peers: [], inbox: []}}
  end

  @impl true
  def handle_call({:connect_peer, node_name}, _from, state) do
    result = Node.connect(node_name)
    peer = %NodePeer{name: node_name, status: if(result == true, do: :connected, else: :disconnected), last_seen_at: DateTime.utc_now()}
    updated_state = %{state | peers: upsert_peer(state.peers, peer)}

    {:reply, {:ok, peer}, updated_state}
  end

  def handle_call({:broadcast, topic, payload}, _from, state) do
    message = %ClusterMessage{
      topic: topic,
      payload: payload,
      origin_node: Node.self(),
      inserted_at: DateTime.utc_now()
    }

    Enum.each(Node.list(), &deliver_to_node(&1, message))
    updated_state = %{state | inbox: state.inbox ++ [message]}

    {:reply, {:ok, message}, updated_state}
  end

  def handle_call({:receive_remote, message}, _from, state) do
    updated_state = %{state | inbox: state.inbox ++ [message]}
    {:reply, {:ok, message}, updated_state}
  end

  def handle_call(:snapshot, _from, state) do
    snapshot = %ClusterSnapshot{
      node_name: Node.self(),
      connected_nodes: Node.list(),
      inbox: state.inbox,
      peers: state.peers
    }

    {:reply, snapshot, state}
  end

  def handle_call(:sync_with_peers, _from, state) do
    remote_snapshots =
      Node.list()
      |> Enum.map(fn node_name ->
        :rpc.call(node_name, __MODULE__, :snapshot, [])
      end)

    {:reply, {:ok, remote_snapshots}, state}
  end

  defp deliver_to_node(node_name, message) do
    :rpc.call(node_name, __MODULE__, :receive_remote, [message])
  end

  defp upsert_peer([], peer), do: [peer]

  defp upsert_peer([%NodePeer{name: name} | tail], %NodePeer{name: name} = peer) do
    [peer | tail]
  end

  defp upsert_peer([head | tail], peer) do
    [head | upsert_peer(tail, peer)]
  end
end
