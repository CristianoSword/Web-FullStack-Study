defmodule ConcurrentWebScraper.ScrapeTarget do
  @enforce_keys [:url]
  defstruct url: nil,
            tags: [],
            timeout_ms: 5_000
end
