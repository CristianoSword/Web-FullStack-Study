# Pattern Matching Functions

Source-complete Erlang project for strict pattern matching over tuples, maps, binaries and tagged records. The module demonstrates clause selection, guards and result shaping in a compact shell-friendly workflow.

## Structure

- `src/pattern_payloads.hrl`: shared record definition.
- `src/pattern_types.erl`: exported type wrapper.
- `src/pattern_matching_functions.erl`: pattern-matching logic, guards and EUnit tests.
- `scripts/run_demo.erl`: demo entrypoint for `erl -noshell`.
- `scripts/run_demo.bat`: Windows helper for compile/run.

## Features

- tuple matching for `ok` and `error` payloads
- list destructuring and count extraction
- map matching for event payloads
- record matching for user roles and statuses
- EUnit tests for classification and transforms

## Run

Compile:

```bash
erlc -o ebin src/pattern_matching_functions.erl src/pattern_types.erl
erlc -o ebin scripts/run_demo.erl
```

Execute:

```bash
erl -pa ebin -noshell -s run_demo main
```

Run tests:

```bash
erl -pa ebin -noshell -eval "eunit:test(pattern_matching_functions, [verbose]), init:stop()."
```

## Validation

Validated locally in this environment:

- `erlc -o ebin src/pattern_matching_functions.erl src/pattern_types.erl`
- `erlc -o ebin scripts/run_demo.erl`
- `erl -pa ebin -noshell -s run_demo main`
- `erl -pa ebin -noshell -eval "eunit:test(pattern_matching_functions, [verbose]), init:stop()."`
