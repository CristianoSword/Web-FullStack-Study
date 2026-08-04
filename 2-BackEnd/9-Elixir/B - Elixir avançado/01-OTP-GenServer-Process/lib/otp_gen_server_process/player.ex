defmodule OtpGenServerProcess.Player do
  @enforce_keys [:id, :name]
  defstruct id: nil,
            name: nil,
            hp: 100,
            energy: 3,
            position: {0, 0},
            status: :online
end
