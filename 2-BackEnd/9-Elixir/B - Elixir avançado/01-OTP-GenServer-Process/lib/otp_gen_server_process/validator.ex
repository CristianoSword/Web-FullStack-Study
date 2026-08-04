defmodule OtpGenServerProcess.Validator do
  alias OtpGenServerProcess.{GameState, Move, Player}

  @board_limit 4

  def validate_join(%GameState{status: :waiting, players: players}, %Player{id: id, name: name}) do
    cond do
      blank?(id) -> {:error, :invalid_player_id}
      blank?(name) -> {:error, :invalid_player_name}
      Enum.any?(players, &(&1.id == id)) -> {:error, :player_already_joined}
      true -> :ok
    end
  end

  def validate_join(%GameState{}, %Player{}), do: {:error, :game_already_started}

  def validate_start(%GameState{players: players, status: :waiting}) do
    if length(players) < 2, do: {:error, :not_enough_players}, else: :ok
  end

  def validate_start(%GameState{}), do: {:error, :game_already_started}

  def validate_move(%GameState{status: :waiting}, %Move{}), do: {:error, :game_not_started}

  def validate_move(%GameState{} = state, %Move{player_id: player_id, action: action, payload: payload}) do
    with :ok <- validate_turn(state, player_id),
         :ok <- validate_player_exists(state, player_id) do
      validate_action(state, action, player_id, payload)
    end
  end

  defp validate_turn(%GameState{current_turn: current_turn}, player_id) when current_turn == player_id, do: :ok
  defp validate_turn(%GameState{}, _player_id), do: {:error, :not_players_turn}

  defp validate_player_exists(%GameState{players: players}, player_id) do
    if Enum.any?(players, &(&1.id == player_id)), do: :ok, else: {:error, :player_not_found}
  end

  defp validate_action(_state, :rest, _player_id, _payload), do: :ok

  defp validate_action(_state, :move, _player_id, payload) do
    case Map.get(payload, :position) do
      {x, y} when is_integer(x) and is_integer(y) and x >= 0 and x <= @board_limit and y >= 0 and y <= @board_limit ->
        :ok

      _other ->
        {:error, :invalid_position}
    end
  end

  defp validate_action(%GameState{players: players}, :attack, player_id, payload) do
    target_id = Map.get(payload, :target_id)

    cond do
      blank?(target_id) -> {:error, :invalid_target}
      target_id == player_id -> {:error, :invalid_target}
      Enum.any?(players, &(&1.id == target_id)) -> :ok
      true -> {:error, :target_not_found}
    end
  end

  defp validate_action(_state, _action, _player_id, _payload), do: {:error, :unsupported_action}

  defp blank?(value) when is_binary(value), do: String.trim(value) == ""
  defp blank?(_value), do: true
end
