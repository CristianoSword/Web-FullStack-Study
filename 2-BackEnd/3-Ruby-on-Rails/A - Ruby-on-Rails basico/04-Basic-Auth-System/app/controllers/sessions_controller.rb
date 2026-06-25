class SessionsController < ApplicationController
  def create
    user = SessionAuthenticator.new.authenticate(params[:email], params[:password_digest])
    session[:user_id] = user.id if user
  end

  def destroy
    reset_session
  end
end
