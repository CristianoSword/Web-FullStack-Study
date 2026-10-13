class SearchController < ApplicationController
  rescue_from ArgumentError, with: :render_invalid_query

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

  def render_invalid_query(error)
    render json: { error: error.message }, status: :unprocessable_entity
  end
end
