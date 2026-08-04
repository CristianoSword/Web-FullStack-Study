# Simple Agent State

Elixir source project for lightweight shared state management with the native `Agent` module.

## Files

- `lib/simple_agent_state/inventory_item.ex`: inventory item struct
- `lib/simple_agent_state/state_snapshot.ex`: snapshot struct
- `lib/simple_agent_state/inventory_agent.ex`: Agent-backed state API
- `lib/simple_agent_state/state_validator.ex`: validation helpers
- `scripts/agent_demo.exs`: demo script

## Supported Actions

- start shared state
- increment counter
- insert or replace inventory item
- inspect snapshot

## Example

```bash
elixir scripts/agent_demo.exs
```

## Validation Note

This project is source-complete and statically reviewed, but not executed locally because the host workspace does not have Elixir installed.
