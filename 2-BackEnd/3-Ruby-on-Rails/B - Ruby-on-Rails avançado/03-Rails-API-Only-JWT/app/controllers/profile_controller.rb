class ProfileController < ApplicationController
  def show
    payload = TokenDecoder.new.decode(request.headers["Authorization"].to_s.delete_prefix("Bearer "))
    render json: payload
  rescue JWT::DecodeError
    render json: { error: "invalid token" }, status: :unauthorized
  end
end
