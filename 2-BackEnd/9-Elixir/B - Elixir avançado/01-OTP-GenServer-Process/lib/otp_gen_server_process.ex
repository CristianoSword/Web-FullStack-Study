defmodule OtpGenServerProcess do
  alias OtpGenServerProcess.{GameServer, Move, Player}

  def sample_players do
    [
      %Player{id: "p1", name: "Ayla", position: {0, 0}},
      %Player{id: "p2", name: "Rui", position: {1, 0}}
    ]
  end

  def play_sample_round(server \\ GameServer) do
    [player_one, player_two] = sample_players()

    with {:ok, _state} <- GameServer.join_player(server, player_one),
         {:ok, _state} <- GameServer.join_player(server, player_two),
         {:ok, _state} <- GameServer.start_game(server),
         {:ok, _state} <-
           GameServer.apply_move(
             server,
             %Move{player_id: "p1", action: :move, payload: %{position: {2, 1}}}
           ),
         {:ok, _state} <-
           GameServer.apply_move(
             server,
             %Move{player_id: "p2", action: :attack, payload: %{target_id: "p1"}}
           ) do
      {:ok, GameServer.snapshot(server)}
    end
  end

  def format_snapshot(snapshot) do
    [
      "Game ID: #{snapshot.game_id}",
      "Status: #{snapshot.status}",
      "Round: #{snapshot.round}",
      "Current turn: #{snapshot.current_turn}",
      "Players: #{Enum.map_join(snapshot.players, ", ", &player_summary/1)}",
      "Events: #{Enum.join(snapshot.event_log, " | ")}"
    ]
    |> Enum.join("\n")
  end

  def print_demo do
    case play_sample_round() do
      {:ok, snapshot} -> IO.puts(format_snapshot(snapshot))
      {:error, reason} -> IO.puts("demo_failed: #{inspect(reason)}")
    end
  end

  defp player_summary(player) do
    "#{player.name}(hp=#{player.hp}, energy=#{player.energy}, pos=#{inspect(player.position)})"
  end
end
