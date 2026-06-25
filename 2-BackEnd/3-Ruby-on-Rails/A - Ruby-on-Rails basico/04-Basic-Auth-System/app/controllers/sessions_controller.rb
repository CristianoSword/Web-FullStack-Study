class SessionsController < ApplicationController
  def create
    user = SessionAuthenticator.new.authenticate(params[:email], params[:password_digest])
    head :unauthorized and return unless user

    session[:user_id] = user.id
  end

  def destroy
    reset_session
  end
end
