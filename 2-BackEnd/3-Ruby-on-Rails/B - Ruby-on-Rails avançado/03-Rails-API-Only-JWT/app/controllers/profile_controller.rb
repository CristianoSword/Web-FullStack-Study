class ProfileController < ApplicationController
  def show
    payload = TokenDecoder.new.decode(request.headers["Authorization"].to_s.delete_prefix("Bearer "))
    render json: payload
  end
end
