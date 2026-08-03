# Recursion List Manipulator

Elixir source project for traversing and transforming lists recursively without `for`/`while`.

## Files

- `lib/recursion_list_manipulator/list_job.ex`: recursive job struct
- `lib/recursion_list_manipulator/list_result.ex`: result struct
- `lib/recursion_list_manipulator/recursive_ops.ex`: recursive implementations
- `lib/recursion_list_manipulator/job_validator.ex`: operation and list validation
- `scripts/recursion_demo.exs`: CLI demo runner

## Recursive Operations

- `sum`
- `count`
- `reverse`
- `double`
- `evens`

## Example

```bash
elixir scripts/recursion_demo.exs sum
elixir scripts/recursion_demo.exs reverse
elixir scripts/recursion_demo.exs evens
```

## Validation Note

This project is source-complete and statically reviewed, but not executed locally because the host workspace does not have Elixir installed.
