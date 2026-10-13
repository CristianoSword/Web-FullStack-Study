class ApplicationController < ActionController::API
  rescue_from ActionController::ParameterMissing, with: :render_missing_parameter

  private

  def render_missing_parameter(error)
    render json: { error: error.message }, status: :unprocessable_entity
  end
end
