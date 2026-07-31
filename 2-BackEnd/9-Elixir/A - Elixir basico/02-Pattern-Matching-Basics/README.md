# Pattern Matching Basics

Elixir source project for practicing destructuring and pattern matching across tuples, lists, maps, and binaries.

## Files

- `lib/pattern_matching_basics/match_payload.ex`: input struct
- `lib/pattern_matching_basics/match_result.ex`: result struct
- `lib/pattern_matching_basics/matcher.ex`: pattern-matching cases
- `lib/pattern_matching_basics/payload_builder.ex`: payload validation and construction
- `scripts/pattern_matching_demo.exs`: CLI demo runner

## Scenarios

- greeting tuple
- coordinate tuple
- head/tail list decomposition
- admin user map
- event payload map
- command-prefixed binary

## Example

```bash
elixir scripts/pattern_matching_demo.exs greeting
elixir scripts/pattern_matching_demo.exs admin
elixir scripts/pattern_matching_demo.exs command
```

## Validation Note

This project is source-complete and statically reviewed, but not executed locally because the host workspace does not have Elixir installed.
