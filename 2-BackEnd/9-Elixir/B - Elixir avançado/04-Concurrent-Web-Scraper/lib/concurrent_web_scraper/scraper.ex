defmodule ConcurrentWebScraper.Scraper do
  alias ConcurrentWebScraper.{HtmlParser, ScrapeResult, ScrapeTarget, Validator}

  def run(targets) when is_list(targets) do
    max_concurrency = Application.get_env(:concurrent_web_scraper, :max_concurrency, 4)

    targets
    |> Task.async_stream(&fetch_target/1, max_concurrency: max_concurrency, timeout: :infinity)
    |> Enum.map(&normalize_result/1)
  end

  defp fetch_target(%ScrapeTarget{} = target) do
    case Validator.validate_target(target) do
      :ok ->
        started_at = System.monotonic_time(:millisecond)
        request = Finch.build(:get, target.url)

        case Finch.request(request, ConcurrentWebScraper.Finch, receive_timeout: target.timeout_ms) do
          {:ok, %Finch.Response{status: status, body: body}} when status in 200..299 ->
            %ScrapeResult{
              url: target.url,
              status: :ok,
              duration_ms: System.monotonic_time(:millisecond) - started_at,
              metadata: HtmlParser.extract_metadata(body)
            }

          {:ok, %Finch.Response{status: status}} ->
            %ScrapeResult{
              url: target.url,
              status: :http_error,
              duration_ms: System.monotonic_time(:millisecond) - started_at,
              error: "unexpected_status:#{status}"
            }

          {:error, reason} ->
            %ScrapeResult{
              url: target.url,
              status: :request_error,
              duration_ms: System.monotonic_time(:millisecond) - started_at,
              error: inspect(reason)
            }
        end

      {:error, reason} ->
        %ScrapeResult{
          url: target.url || "invalid-target",
          status: :validation_error,
          error: Atom.to_string(reason)
        }
    end
  end

  defp normalize_result({:ok, result}), do: result

  defp normalize_result({:exit, reason}) do
    %ScrapeResult{
      url: "unknown",
      status: :task_exit,
      error: inspect(reason)
    }
  end
end
