defmodule OtpGenServerProcess.Move do
  @enforce_keys [:player_id, :action]
  defstruct player_id: nil,
            action: nil,
            payload: %{},
            issued_at: nil
end
