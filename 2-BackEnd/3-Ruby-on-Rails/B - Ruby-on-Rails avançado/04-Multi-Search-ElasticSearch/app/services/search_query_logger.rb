class SearchQueryLogger
  def log!(query:, filters:, results_count:)
    SearchQuery.create!(
      query: query,
      scope: filters.scope,
      filters_digest: filters.digest,
      results_count: results_count,
      searched_at: Time.current
    )
  end
end
