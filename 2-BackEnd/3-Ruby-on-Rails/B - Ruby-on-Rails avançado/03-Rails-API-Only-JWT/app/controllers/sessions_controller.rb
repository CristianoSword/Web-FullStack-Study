class SessionsController < ApplicationController
  def create
    user = ApiUser.find_by!(email: params[:email])
    render json: { token: TokenEncoder.new.encode(user) }
  end
end
