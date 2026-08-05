defmodule SupervisorTreeRecovery.Job do
  @enforce_keys [:id, :type]
  defstruct id: nil,
            type: nil,
            payload: %{},
            retries: 0
end
