# Concurrent Web Scraper

Source-complete Elixir project for concurrent page fetching with `Task.async_stream/3`. The scraper uses `Finch` for HTTP requests, `Floki` for HTML parsing, and a configurable concurrency limit.

## Structure

- `mix.exs`: dependencies for `finch`, `floki` and `jason`.
- `config/config.exs`: request timeout and concurrency configuration.
- `lib/concurrent_web_scraper/application.ex`: starts the shared Finch pool.
- `lib/concurrent_web_scraper/scrape_target.ex`: target model with URL and timeout.
- `lib/concurrent_web_scraper/page_metadata.ex`: extracted title, headings and link count.
- `lib/concurrent_web_scraper/scrape_result.ex`: normalized result model for success or failure.
- `lib/concurrent_web_scraper/html_parser.ex`: HTML parsing helpers powered by Floki.
- `lib/concurrent_web_scraper/scraper.ex`: `Task.async_stream/3` pipeline with validation and result normalization.
- `lib/concurrent_web_scraper/validator.ex`: URL and timeout validation.
- `lib/concurrent_web_scraper.ex`: demo facade and printable output.
- `scripts/scraper_demo.exs`: `mix run` entrypoint.

## Features

- concurrent scraping with bounded parallelism
- shared Finch connection pool
- title, heading and link extraction
- structured result objects for success, HTTP error, request error and validation error
- configurable timeout per target

## Run

```bash
mix deps.get
mix run scripts/scraper_demo.exs
```

You can also inspect the pipeline from `iex -S mix`:

```elixir
ConcurrentWebScraper.sample_targets()
ConcurrentWebScraper.run_demo()
```

## Validation

The current environment does not include the Elixir SDK, so this project was validated statically:

- dependency choices and application startup reviewed for coherence
- scraper pipeline uses real `Task.async_stream/3`, Finch and Floki integration points
- demo module references real source files and structs
- README commands match the project layout
