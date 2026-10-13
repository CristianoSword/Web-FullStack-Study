class SearchController < ApplicationController
  def index
    query = params.fetch(:q).to_s.strip

    render json: GlobalSearch.new(
      query: query,
      filters: SearchFilterSet.new(search_params)
    ).call
  end

  private

  def search_params
    params.permit(:scope, :category, :tag, :author_slug, :page, :per_page)
  end
end
