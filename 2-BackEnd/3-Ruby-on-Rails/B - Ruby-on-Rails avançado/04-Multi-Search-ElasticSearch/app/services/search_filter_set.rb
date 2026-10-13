class SearchFilterSet
  attr_reader :scope, :category, :tag, :author_slug, :page, :per_page

  def initialize(params = {})
    @scope = normalized_scope(params[:scope])
    @category = normalize_value(params[:category])
    @tag = normalize_value(params[:tag])
    @author_slug = normalize_value(params[:author_slug])
    @page = [params[:page].to_i, 1].max
    requested_per_page = params[:per_page].to_i
    @per_page = [[requested_per_page.zero? ? 10 : requested_per_page, 1].max, 50].min
  end

  def article_scope?
    scope == "articles"
  end

  def author_scope?
    scope == "authors"
  end

  def all_scope?
    scope == "all"
  end

  def digest
    [scope, category, tag, author_slug, page, per_page].compact.join(":")
  end

  private

  def normalized_scope(raw_scope)
    allowed = %w[all articles authors]
    normalized = normalize_value(raw_scope)
    allowed.include?(normalized) ? normalized : "all"
  end

  def normalize_value(raw_value)
    value = raw_value.to_s.strip
    value.empty? ? nil : value
  end
end
