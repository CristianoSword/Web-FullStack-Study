defmodule OtpGenServerProcess.GameState do
  @enforce_keys [:game_id]
  defstruct game_id: nil,
            status: :waiting,
            players: [],
            board: %{},
            round: 1,
            turn_order: [],
            current_turn: nil,
            event_log: []
end
