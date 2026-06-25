class BookCatalog
  def initialize(scope = Book.all)
    @scope = scope
  end

  def recent
    @scope.order(created_at: :desc)
  end

  def by_author(name)
    @scope.where(author: name)
  end
end
