defmodule OtpGenServerProcess.Engine do
  alias OtpGenServerProcess.{GameState, Move, Player}

  def new_game(game_id) do
    %GameState{game_id: game_id}
  end

  def join_player(%GameState{status: :waiting, players: players} = state, %Player{id: id} = player) do
    if Enum.any?(players, &(&1.id == id)) do
      {:error, :player_already_joined}
    else
      updated_players = players ++ [player]
      updated_board = Map.put(state.board, id, player.position)

      {:ok,
       %GameState{
         state
         | players: updated_players,
           board: updated_board,
           event_log: state.event_log ++ ["player_joined:#{player.name}"]
       }}
    end
  end

  def join_player(%GameState{}, %Player{}), do: {:error, :game_already_started}

  def start_game(%GameState{players: []}), do: {:error, :not_enough_players}

  def start_game(%GameState{players: players} = state) do
    turn_order = Enum.map(players, & &1.id)

    {:ok,
     %GameState{
       state
       | status: :active,
         turn_order: turn_order,
         current_turn: List.first(turn_order),
         event_log: state.event_log ++ ["game_started"]
     }}
  end

  def apply_move(%GameState{status: :waiting}, %Move{}), do: {:error, :game_not_started}

  def apply_move(%GameState{} = state, %Move{player_id: player_id, action: :move, payload: payload}) do
    destination = Map.get(payload, :position, {0, 0})

    updated_state =
      state
      |> update_player(player_id, fn player -> %Player{player | position: destination, energy: max(player.energy - 1, 0)} end)
      |> put_position(player_id, destination)
      |> append_event("move:#{player_id}:#{inspect(destination)}")
      |> advance_turn()

    {:ok, updated_state}
  end

  def apply_move(%GameState{} = state, %Move{player_id: player_id, action: :attack, payload: payload}) do
    target_id = Map.get(payload, :target_id)

    updated_state =
      state
      |> update_player(target_id, fn player -> %Player{player | hp: max(player.hp - 15, 0)} end)
      |> update_player(player_id, fn player -> %Player{player | energy: max(player.energy - 1, 0)} end)
      |> append_event("attack:#{player_id}:#{target_id}")
      |> advance_turn()

    {:ok, updated_state}
  end

  def apply_move(%GameState{} = state, %Move{player_id: player_id, action: :rest}) do
    updated_state =
      state
      |> update_player(player_id, fn player -> %Player{player | energy: min(player.energy + 1, 5)} end)
      |> append_event("rest:#{player_id}")
      |> advance_turn()

    {:ok, updated_state}
  end

  def apply_move(%GameState{}, %Move{}), do: {:error, :unsupported_action}

  defp put_position(%GameState{} = state, player_id, destination) do
    %GameState{state | board: Map.put(state.board, player_id, destination)}
  end

  defp update_player(%GameState{players: players} = state, player_id, updater) do
    %GameState{state | players: do_update_player(players, player_id, updater)}
  end

  defp do_update_player([], _player_id, _updater), do: []

  defp do_update_player([%Player{id: player_id} = player | tail], player_id, updater) do
    [updater.(player) | tail]
  end

  defp do_update_player([head | tail], player_id, updater) do
    [head | do_update_player(tail, player_id, updater)]
  end

  defp append_event(%GameState{} = state, event) do
    %GameState{state | event_log: state.event_log ++ [event]}
  end

  defp advance_turn(%GameState{turn_order: []} = state), do: state

  defp advance_turn(%GameState{turn_order: turn_order, current_turn: current_turn, round: round} = state) do
    current_index = Enum.find_index(turn_order, &(&1 == current_turn)) || 0
    next_index = rem(current_index + 1, length(turn_order))
    next_turn = Enum.at(turn_order, next_index)
    next_round = if next_index == 0, do: round + 1, else: round

    %GameState{state | current_turn: next_turn, round: next_round}
  end
end
