defmodule ConcurrentWebScraper.ScrapeResult do
  @enforce_keys [:url, :status]
  defstruct url: nil,
            status: nil,
            duration_ms: 0,
            metadata: %ConcurrentWebScraper.PageMetadata{},
            error: nil
end
