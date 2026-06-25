class SearchController < ApplicationController
  def index
    render json: GlobalSearch.new.call(params[:q].to_s)
  end
end
