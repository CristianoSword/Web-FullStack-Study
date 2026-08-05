defmodule ConcurrentWebScraper.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Finch, name: ConcurrentWebScraper.Finch}
    ]

    opts = [strategy: :one_for_one, name: ConcurrentWebScraper.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
