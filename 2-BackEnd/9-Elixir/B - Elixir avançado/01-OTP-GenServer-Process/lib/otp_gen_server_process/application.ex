defmodule OtpGenServerProcess.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {OtpGenServerProcess.GameServer, name: OtpGenServerProcess.GameServer}
    ]

    opts = [strategy: :one_for_one, name: OtpGenServerProcess.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
