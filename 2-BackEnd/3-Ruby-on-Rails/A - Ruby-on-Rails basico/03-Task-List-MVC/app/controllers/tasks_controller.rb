class TasksController < ApplicationController
  include TaskResponder

  def index
    @tasks = TaskBoard.new.pending
  end

  def create
    @task = Task.new(task_params)
    return render_task_errors(@task) unless @task.save
  end

  private

  def task_params
    params.require(:task).permit(:title, :done)
  end
end
