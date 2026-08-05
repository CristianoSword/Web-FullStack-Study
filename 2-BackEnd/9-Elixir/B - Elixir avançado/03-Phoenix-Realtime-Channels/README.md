# Phoenix Realtime Channels

Source-complete Phoenix chat project centered on Channels, WebSockets and room presence. The codebase includes real Phoenix dependencies, an endpoint, router, channel modules, and an in-memory chat store for room summaries and recent messages.

## Structure

- `mix.exs`: Phoenix dependencies (`phoenix`, `phoenix_pubsub`, `plug_cowboy`, `jason`).
- `config/config.exs`: endpoint and PubSub configuration.
- `lib/phoenix_realtime_channels/application.ex`: supervision tree with PubSub, chat store and endpoint.
- `lib/phoenix_realtime_channels/chat_message.ex`: room message model.
- `lib/phoenix_realtime_channels/presence_session.ex`: user presence model.
- `lib/phoenix_realtime_channels/room_summary.ex`: room summary projection.
- `lib/phoenix_realtime_channels/chat_store.ex`: stateful store for presence and recent messages.
- `lib/phoenix_realtime_channels/chat.ex`: chat context used by the channel and HTTP controller.
- `lib/phoenix_realtime_channels/validator.ex`: validation rules for room names, users and message bodies.
- `lib/phoenix_realtime_channels_web/endpoint.ex`: Phoenix endpoint with WebSocket mount.
- `lib/phoenix_realtime_channels_web/channels/user_socket.ex`: socket definition for `room:*`.
- `lib/phoenix_realtime_channels_web/channels/room_channel.ex`: join, summary and message events.
- `lib/phoenix_realtime_channels_web/router.ex`: API routes for health and room summary.
- `lib/phoenix_realtime_channels_web/controllers/page_controller.ex`: JSON endpoints.

## Features

- WebSocket entrypoint at `/socket`
- `room:*` channels with join and message events
- in-memory room presence tracking
- room summary endpoint at `GET /rooms/:room`
- real broadcast flow with `broadcast!/3`
- validation for room, user and message inputs

## Run

```bash
mix deps.get
mix phx.server
```

Example channel events:

```text
join topic: room:lobby
event: message:new
payload: {"body":"hello from Phoenix"}
```

HTTP check:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/rooms/lobby
```

## Validation

The local environment does not currently include the Elixir/Phoenix toolchain, so this project was validated statically:

- dependency and endpoint wiring reviewed for Phoenix consistency
- channel, router and controller modules reference real context functions
- room summary and broadcast flow align with the chat store implementation
- README commands and paths correspond to actual project files
