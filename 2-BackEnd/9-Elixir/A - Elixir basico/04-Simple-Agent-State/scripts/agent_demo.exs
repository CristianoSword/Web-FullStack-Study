base = Path.expand("../lib/simple_agent_state", __DIR__)

Code.require_file(Path.join(base, "inventory_item.ex"))
Code.require_file(Path.join(base, "state_snapshot.ex"))
Code.require_file(Path.join(base, "inventory_agent.ex"))

alias SimpleAgentState.InventoryAgent

{:ok, _pid} = InventoryAgent.start_link()

InventoryAgent.increment_counter()
InventoryAgent.increment_counter()
InventoryAgent.put_item("keyboard", 3)
InventoryAgent.put_item("monitor", 1)
InventoryAgent.put_item("keyboard", 5)

snapshot = InventoryAgent.snapshot()

IO.inspect(snapshot, label: "agent_snapshot")
