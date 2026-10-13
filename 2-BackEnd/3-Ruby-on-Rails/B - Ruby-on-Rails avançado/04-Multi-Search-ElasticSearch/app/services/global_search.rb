class GlobalSearch
  def initialize(
    query:,
    filters: SearchFilterSet.new,
    logger: SearchQueryLogger.new,
    presenter: SearchResultPresenter.new(filters: filters)
  )
    @query = query.to_s.strip
    @filters = filters
    @logger = logger
    @presenter = presenter
  end

  def call
    articles = fetch_articles
    authors = fetch_authors
    total_results = articles.length + authors.length

    @logger.log!(query: @query, filters: @filters, results_count: total_results)

    {
      metadata: @presenter.metadata(total_results: total_results),
      articles: @presenter.articles(articles),
      authors: @presenter.authors(authors)
    }
  end

  private

  def fetch_articles
    return [] if @filters.author_scope?

    scope = ArticleDocument.includes(:author_profile, :topic_tags).published_only.recent_first
    scope = scope.where(category: @filters.category) if @filters.category.present?
    scope = scope.joins(:topic_tags).where(topic_tags: { slug: @filters.tag }) if @filters.tag.present?
    scope = scope.joins(:author_profile).where(author_profiles: { slug: @filters.author_slug }) if @filters.author_slug.present?

    elastic_ids = elastic_article_ids
    scoped = elastic_ids.any? ? scope.where(id: elastic_ids).index_by(&:id) : fallback_article_scope(scope).index_by(&:id)
    elastic_ids.any? ? elastic_ids.filter_map { |id| scoped[id] } : scoped.values
  end

  def fetch_authors
    return [] if @filters.article_scope?

    scope = AuthorProfile.all
    scope = scope.where(expertise_area: @filters.category) if @filters.category.present?
    scope = scope.where(slug: @filters.author_slug) if @filters.author_slug.present?

    elastic_ids = elastic_author_ids
    scoped = elastic_ids.any? ? scope.where(id: elastic_ids).index_by(&:id) : fallback_author_scope(scope).index_by(&:id)
    elastic_ids.any? ? elastic_ids.filter_map { |id| scoped[id] } : scoped.values
  end

  def elastic_article_ids
    return [] if @query.blank?

    response = ArticleDocument.search(
      {
        query: {
          multi_match: {
            query: @query,
            fields: %w[title^3 summary^2 body author_name tags]
          }
        },
        from: (@filters.page - 1) * @filters.per_page,
        size: @filters.per_page
      }
    )

    response.records.map(&:id)
  rescue StandardError
    []
  end

  def elastic_author_ids
    return [] if @query.blank?

    response = AuthorProfile.search(
      {
        query: {
          multi_match: {
            query: @query,
            fields: %w[title^2 summary body category]
          }
        },
        from: (@filters.page - 1) * @filters.per_page,
        size: @filters.per_page
      }
    )

    response.records.map(&:id)
  rescue StandardError
    []
  end

  def fallback_article_scope(scope)
    return scope.limit(@filters.per_page) if @query.blank?

    like = "%#{@query}%"
    scope.where(
      "article_documents.title LIKE :query OR article_documents.summary LIKE :query OR article_documents.body LIKE :query",
      query: like
    ).limit(@filters.per_page)
  end

  def fallback_author_scope(scope)
    return scope.limit(@filters.per_page) if @query.blank?

    like = "%#{@query}%"
    scope.where(
      "author_profiles.name LIKE :query OR author_profiles.bio LIKE :query OR author_profiles.headline LIKE :query",
      query: like
    ).limit(@filters.per_page)
  end
end
