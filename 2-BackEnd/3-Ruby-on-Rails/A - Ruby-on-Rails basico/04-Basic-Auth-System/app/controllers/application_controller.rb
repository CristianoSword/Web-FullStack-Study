class ApplicationController < ActionController::Base
  before_action :require_secure_session

  private

  def require_secure_session
    request.session_options[:secure] = true
  end
end
