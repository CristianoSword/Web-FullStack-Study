class TasksController < ApplicationController
  def index
    @tasks = TaskBoard.new.pending
  end

  def create
    @task = Task.create!(task_params)
  end

  private

  def task_params
    params.require(:task).permit(:title, :done)
  end
end
