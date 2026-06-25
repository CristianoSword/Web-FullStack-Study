class SessionsController < ApplicationController
  def create
    return render json: { error: "email required" }, status: :unprocessable_entity if params[:email].blank?

    user = ApiUser.find_by!(email: params[:email])
    render json: { token: TokenEncoder.new.encode(user) }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "invalid credentials" }, status: :unauthorized
  end
end
