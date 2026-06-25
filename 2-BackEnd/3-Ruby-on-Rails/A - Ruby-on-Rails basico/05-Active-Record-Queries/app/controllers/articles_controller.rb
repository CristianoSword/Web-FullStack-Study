class ArticlesController < ApplicationController
  def index
    @articles = ArticleAnalytics.new.most_viewed
  end
end
