module RenderableErrors
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordInvalid do |error|
      render json: { errors: error.record.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
