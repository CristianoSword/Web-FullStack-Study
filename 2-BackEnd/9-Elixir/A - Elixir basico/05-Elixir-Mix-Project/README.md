# Elixir Mix Project

Basic study tracker built as a real Mix application. The project keeps a list of study tasks, exposes a public module that can be executed with `mix run`, and validates task creation and completion before mutating the list.

## Structure

- `mix.exs`: Mix configuration and application bootstrap.
- `lib/study_mix_project/application.ex`: OTP application entrypoint.
- `lib/study_mix_project/study_task.ex`: task struct with title, difficulty and completion flag.
- `lib/study_mix_project/tracker.ex`: list management, filtering and progress summary logic.
- `lib/study_mix_project/validator.ex`: title, difficulty and completion-target validation.
- `lib/study_mix_project.ex`: public API used by scripts or IEx.
- `scripts/study_mix_demo.exs`: simple `mix run` entrypoint for the sample flow.

## Features

- seeds a default backlog of Elixir study tasks
- adds new tasks through a validated API
- marks an existing task as completed
- filters pending tasks and difficulty-specific tasks
- calculates total, completed, pending and completion-rate metrics

## Run

```bash
mix run scripts/study_mix_demo.exs
```

You can also inspect the public API from `iex -S mix`:

```elixir
StudyMixProject.demo_report()
StudyMixProject.add_task([], "Practice pattern matching", :easy)
StudyMixProject.complete_task(StudyMixProject.boot_sample(), "Review Elixir syntax")
```

## Validation

This repository does not currently have the Elixir toolchain installed locally, so this project was validated by static source review:

- coherent Mix project layout
- valid application/module wiring
- consistent task struct, tracker, validator and script entrypoint
- README flow aligned with the source files
