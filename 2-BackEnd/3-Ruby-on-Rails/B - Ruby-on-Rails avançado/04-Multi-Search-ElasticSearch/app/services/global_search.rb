class GlobalSearch
  def call(query)
    {
      articles: ArticleDocument.where("title LIKE ?", "%#{query}%"),
      authors: AuthorProfile.where("name LIKE ?", "%#{query}%")
    }
  end
end
