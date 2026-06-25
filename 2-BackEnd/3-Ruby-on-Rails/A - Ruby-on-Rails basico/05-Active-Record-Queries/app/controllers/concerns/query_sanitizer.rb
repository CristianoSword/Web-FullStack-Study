module QuerySanitizer
  extend ActiveSupport::Concern

  def safe_author_name
    params[:author].to_s.strip
  end
end
