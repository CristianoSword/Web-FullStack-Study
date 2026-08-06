defmodule ConcurrentWebScraper do
  alias ConcurrentWebScraper.{ScrapeTarget, Scraper}

  def sample_targets do
    [
      %ScrapeTarget{url: "https://example.com", tags: [:docs]},
      %ScrapeTarget{url: "https://elixir-lang.org", tags: [:language]},
      %ScrapeTarget{url: "https://hex.pm", tags: [:ecosystem]}
    ]
  end

  def run_demo do
    sample_targets()
    |> Scraper.run()
  end

  def render_results(results) do
    results
    |> Enum.map(&render_result/1)
    |> Enum.join("\n\n")
  end

  def print_demo do
    run_demo()
    |> render_results()
    |> IO.puts()
  end

  defp render_result(result) do
    [
      "URL: #{result.url}",
      "Status: #{result.status}",
      "Duration: #{result.duration_ms}ms",
      "Title: #{result.metadata.title || "n/a"}",
      "Headings: #{join_or_none(result.metadata.headings)}",
      "Links: #{result.metadata.links_count}",
      "Error: #{result.error || "none"}"
    ]
    |> Enum.join("\n")
  end

  defp join_or_none([]), do: "none"
  defp join_or_none(items), do: Enum.join(items, " | ")
end
