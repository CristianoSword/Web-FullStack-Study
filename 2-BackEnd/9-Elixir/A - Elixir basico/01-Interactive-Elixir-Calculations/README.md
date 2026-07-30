# Interactive Elixir Calculations

Elixir source project for arithmetic and primitive-type calculations via CLI and shell-oriented scripts.

## Files

- `lib/interactive_calculations/calculation_request.ex`: request struct
- `lib/interactive_calculations/calculation_result.ex`: result struct
- `lib/interactive_calculations/calculator.ex`: arithmetic core
- `lib/interactive_calculations/input_validator.ex`: validation guards
- `scripts/interactive_calculations.exs`: CLI entrypoint

## Operations

- `add`
- `subtract`
- `multiply`
- `divide`
- `percentage`
- `average`

## Example

```bash
elixir scripts/interactive_calculations.exs add 10 5
elixir scripts/interactive_calculations.exs divide 100 4
elixir scripts/interactive_calculations.exs percentage 200 15
```

## Validation Note

This project is source-complete, but it was not executed locally because the current workspace does not have the Elixir SDK installed. Validation in this turn was static review of module structure, CLI flow, and guard coverage.
