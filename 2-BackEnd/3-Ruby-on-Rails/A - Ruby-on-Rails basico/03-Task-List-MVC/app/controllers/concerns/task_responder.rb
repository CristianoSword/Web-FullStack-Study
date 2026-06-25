module TaskResponder
  extend ActiveSupport::Concern

  def render_task_errors(task)
    render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
  end
end
