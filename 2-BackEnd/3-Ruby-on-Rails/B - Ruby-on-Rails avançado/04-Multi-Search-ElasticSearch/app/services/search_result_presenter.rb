class SearchResultPresenter
  def initialize(filters:)
    @filters = filters
  end

  def articles(records)
    records.map do |article|
      {
        id: article.id,
        type: "article",
        title: article.title,
        slug: article.slug,
        category: article.category,
        author: article.author_profile.name,
        tags: article.topic_tags.map(&:slug),
        summary: article.summary,
        published_at: article.published_at
      }
    end
  end

  def authors(records)
    records.map do |author|
      {
        id: author.id,
        type: "author",
        name: author.name,
        slug: author.slug,
        headline: author.headline,
        expertise_area: author.expertise_area,
        followers_count: author.followers_count
      }
    end
  end

  def metadata(total_results:)
    {
      scope: @filters.scope,
      page: @filters.page,
      per_page: @filters.per_page,
      total_results: total_results,
      category: @filters.category,
      tag: @filters.tag,
      author_slug: @filters.author_slug
    }
  end
end
