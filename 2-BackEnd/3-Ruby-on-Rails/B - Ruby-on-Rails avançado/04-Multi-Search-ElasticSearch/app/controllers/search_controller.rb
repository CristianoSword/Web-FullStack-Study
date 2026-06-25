class SearchController < ApplicationController
  def index
    query = params[:q].to_s.strip
    return render json: { error: "query required" }, status: :unprocessable_entity if query.empty?

    render json: GlobalSearch.new.call(query)
  end
end
