class TaskBoard
  def initialize(scope = Task.all)
    @scope = scope
  end

  def pending
    @scope.where(done: false)
  end

  def finish(task)
    task.update!(done: true)
  end
end
