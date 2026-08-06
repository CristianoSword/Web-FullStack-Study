defmodule ConcurrentWebScraper.Validator do
  alias ConcurrentWebScraper.ScrapeTarget

  def validate_target(%ScrapeTarget{url: url, timeout_ms: timeout_ms}) do
    cond do
      not valid_url?(url) -> {:error, :invalid_url}
      not is_integer(timeout_ms) or timeout_ms <= 0 -> {:error, :invalid_timeout}
      timeout_ms > 15_000 -> {:error, :timeout_too_high}
      true -> :ok
    end
  end

  def validate_target(_target), do: {:error, :invalid_target}

  defp valid_url?(url) when is_binary(url) do
    case URI.parse(url) do
      %URI{scheme: scheme, host: host} when scheme in ["http", "https"] and is_binary(host) ->
        true

      _other ->
        false
    end
  end

  defp valid_url?(_url), do: false
end
