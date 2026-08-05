defmodule PhoenixRealtimeChannels.Validator do
  def validate_room(room) when is_binary(room) do
    if String.trim(room) == "" do
      {:error, :invalid_room}
    else
      :ok
    end
  end

  def validate_room(_room), do: {:error, :invalid_room}

  def validate_presence_user(user_id, display_name) do
    cond do
      not is_binary(user_id) or String.trim(user_id) == "" -> {:error, :invalid_user_id}
      not is_binary(display_name) or String.trim(display_name) == "" -> {:error, :invalid_display_name}
      true -> :ok
    end
  end

  def validate_message_body(body) when is_binary(body) do
    size = String.length(String.trim(body))

    cond do
      size == 0 -> {:error, :empty_message}
      size > 280 -> {:error, :message_too_long}
      true -> :ok
    end
  end

  def validate_message_body(_body), do: {:error, :invalid_message_body}
end
