defmodule ConcurrentWebScraper.MixProject do
  use Mix.Project

  def project do
    [
      app: :concurrent_web_scraper,
      version: "0.1.0",
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      mod: {ConcurrentWebScraper.Application, []},
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:finch, "~> 0.18"},
      {:floki, "~> 0.36"},
      {:jason, "~> 1.4"}
    ]
  end
end
