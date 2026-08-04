defmodule StudyMixProject do
  alias StudyMixProject.{StudyTask, Tracker, Validator}

  def boot_sample do
    with {:ok, tasks} <- add_task(Tracker.seed_tasks(), "Document the Mix workflow", :medium),
         {:ok, updated_tasks} <- complete_task(tasks, "Review Elixir syntax") do
      updated_tasks
    end
  end

  def demo_report do
    tasks = boot_sample()

    %{
      tasks: tasks,
      summary: Tracker.summary(tasks),
      pending_titles: Enum.map(Tracker.pending_tasks(tasks), & &1.title),
      hard_tasks: Enum.map(Tracker.tasks_by_difficulty(tasks, :hard), & &1.title)
    }
  end

  def add_task(tasks, title, difficulty) do
    with :ok <- Validator.validate_title(title),
         :ok <- Validator.validate_difficulty(difficulty) do
      {:ok, Tracker.add_task(tasks, %StudyTask{title: title, difficulty: difficulty})}
    end
  end

  def complete_task(tasks, title) do
    with :ok <- Validator.validate_title(title),
         :ok <- Validator.validate_completion_target(tasks, title) do
      {:ok, Tracker.mark_completed(tasks, title)}
    end
  end

  def format_report(report) do
    [
      "Study Mix Project Demo",
      "Total tasks: #{report.summary.total}",
      "Completed tasks: #{report.summary.completed}",
      "Pending tasks: #{report.summary.pending}",
      "Completion rate: #{report.summary.completion_rate}%",
      "Pending titles: #{join_or_none(report.pending_titles)}",
      "Hard tasks: #{join_or_none(report.hard_tasks)}"
    ]
    |> Enum.join("\n")
  end

  def print_demo do
    demo_report()
    |> format_report()
    |> IO.puts()
  end

  defp join_or_none([]), do: "none"
  defp join_or_none(items), do: Enum.join(items, ", ")
end
