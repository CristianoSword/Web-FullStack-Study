defmodule StudyMixProject do
  alias StudyMixProject.{StudyTask, Tracker}

  def boot_sample do
    Tracker.seed_tasks()
    |> Tracker.add_task(%StudyTask{
      title: "Document the Mix workflow",
      difficulty: :medium
    })
    |> Tracker.mark_completed("Review Elixir syntax")
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

  def format_report(report) do
    [
      "Study Mix Project Demo",
      "Total tasks: #{report.summary.total}",
      "Completed tasks: #{report.summary.completed}",
      "Pending tasks: #{report.summary.pending}",
      "Completion rate: #{report.summary.completion_rate}%",
      "Pending titles: #{Enum.join(report.pending_titles, ", ")}",
      "Hard tasks: #{Enum.join(report.hard_tasks, ", ")}"
    ]
    |> Enum.join("\n")
  end

  def print_demo do
    demo_report()
    |> format_report()
    |> IO.puts()
  end
end
