# Eshell Interactive Operations

Source-complete Erlang project for basic data operations that can be explored from the Erlang shell. The project models a small operation session, exposes aggregation helpers, and includes both a shell-friendly demo and an EUnit test.

## Structure

- `src/eshell_operations.hrl`: record definition for an operation session.
- `src/eshell_types.erl`: exported type for the session record.
- `src/eshell_operations.erl`: session creation, sum, average, even filtering and summary logic.
- `scripts/run_demo.erl`: non-interactive entrypoint for `erl -noshell`.
- `scripts/run_demo.bat`: Windows helper for compiling and running the demo.
- `Makefile`: minimal compile targets.

## Features

- shell-friendly data manipulation helpers
- average and total calculation
- even-number filtering
- validation for labels, number lists and atom tags
- EUnit regression test

## Run

Compile:

```bash
erlc -o ebin src/eshell_operations.erl src/eshell_types.erl
erlc -o ebin scripts/run_demo.erl
```

Execute:

```bash
erl -pa ebin -noshell -s run_demo main
```

Run tests:

```bash
erl -pa ebin -noshell -eval "eunit:test(eshell_operations, [verbose]), init:stop()."
```

## Validation

Validated locally in this environment:

- `erlc -o ebin src/eshell_operations.erl src/eshell_types.erl`
- `erlc -o ebin scripts/run_demo.erl`
- `erl -pa ebin -noshell -s run_demo main`
- `erl -pa ebin -noshell -eval "eunit:test(eshell_operations, [verbose]), init:stop()."`
