defmodule ConcurrentWebScraper.HtmlParser do
  alias ConcurrentWebScraper.PageMetadata

  def extract_metadata(html) do
    with {:ok, document} <- Floki.parse_document(html) do
      %PageMetadata{
        title: extract_title(document),
        headings: extract_headings(document),
        links_count: length(Floki.find(document, "a"))
      }
    else
      _error ->
        %PageMetadata{}
    end
  end

  defp extract_title(document) do
    document
    |> Floki.find("title")
    |> Floki.text()
    |> normalize_text()
  end

  defp extract_headings(document) do
    document
    |> Floki.find("h1, h2")
    |> Enum.map(&Floki.text/1)
    |> Enum.map(&normalize_text/1)
    |> Enum.reject(&(&1 == ""))
  end

  defp normalize_text(value) do
    value
    |> to_string()
    |> String.replace(~r/\s+/, " ")
    |> String.trim()
  end
end
