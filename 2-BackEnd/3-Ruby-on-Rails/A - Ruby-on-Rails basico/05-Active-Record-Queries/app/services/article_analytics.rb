class ArticleAnalytics
  def most_viewed
    Article.includes(:author).order(views: :desc)
  end

  def by_author(author_name)
    Article.joins(:author).where(authors: { name: author_name })
  end
end
