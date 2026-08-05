# OTP GenServer Process

Concurrent game-state server built with OTP and `GenServer`. The project models players, game state and moves, runs a supervised game process, and exposes a small scriptable API for simulating a round.

## Structure

- `mix.exs`: Mix project definition.
- `lib/otp_gen_server_process/application.ex`: supervisor bootstrapping the named game server.
- `lib/otp_gen_server_process/game_state.ex`: domain state for the running match.
- `lib/otp_gen_server_process/player.ex`: player model with HP, energy and board position.
- `lib/otp_gen_server_process/move.ex`: command model for move, attack and rest actions.
- `lib/otp_gen_server_process/engine.ex`: pure state transitions for join, start and action handling.
- `lib/otp_gen_server_process/game_server.ex`: `GenServer` callbacks and public client API.
- `lib/otp_gen_server_process/validator.ex`: join, start and turn validation rules.
- `lib/otp_gen_server_process.ex`: demo-oriented facade.
- `scripts/game_demo.exs`: sample `mix run` entrypoint.

## Features

- supervised named `GenServer`
- concurrent state ownership through OTP callbacks
- player join flow with duplicate prevention
- game start with turn order generation
- action handling for `:move`, `:attack` and `:rest`
- turn rotation and round advancement
- validation for turn ownership, player existence, target existence and board coordinates

## Run

```bash
mix run scripts/game_demo.exs
```

Useful functions from `iex -S mix`:

```elixir
OtpGenServerProcess.sample_players()
OtpGenServerProcess.play_sample_round()
OtpGenServerProcess.GameServer.snapshot()
```

## Validation

The local environment does not include the Elixir SDK, so this project was validated through static source review:

- consistent OTP application wiring
- coherent `GenServer` client/callback flow
- domain models aligned with engine and validator rules
- README commands mapped to real files and modules
