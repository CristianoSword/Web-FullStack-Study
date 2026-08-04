defmodule StudyMixProject.Tracker do
  alias StudyMixProject.StudyTask

  def seed_tasks do
    [
      %StudyTask{title: "Review Elixir syntax", difficulty: :easy},
      %StudyTask{title: "Implement Agent demo", difficulty: :medium},
      %StudyTask{title: "Prepare GenServer exercise", difficulty: :hard}
    ]
  end

  def add_task(tasks, %StudyTask{} = task), do: tasks ++ [task]

  def mark_completed([], _title), do: []

  def mark_completed([%StudyTask{title: title} = task | tail], title) do
    [%StudyTask{task | completed: true} | tail]
  end

  def mark_completed([head | tail], title), do: [head | mark_completed(tail, title)]

  def pending_tasks(tasks), do: filter_pending(tasks, [])

  def tasks_by_difficulty(tasks, difficulty), do: filter_by_difficulty(tasks, difficulty, [])

  def summary(tasks) do
    completed = count_completed(tasks)
    total = count(tasks)

    %{
      total: total,
      completed: completed,
      pending: total - completed,
      completion_rate: completion_rate(total, completed)
    }
  end

  defp count([]), do: 0
  defp count([_head | tail]), do: 1 + count(tail)

  defp count_completed([]), do: 0
  defp count_completed([%StudyTask{completed: true} | tail]), do: 1 + count_completed(tail)
  defp count_completed([_head | tail]), do: count_completed(tail)

  defp filter_pending([], acc), do: reverse(acc)

  defp filter_pending([%StudyTask{completed: false} = task | tail], acc) do
    filter_pending(tail, [task | acc])
  end

  defp filter_pending([_head | tail], acc), do: filter_pending(tail, acc)

  defp filter_by_difficulty([], _difficulty, acc), do: reverse(acc)

  defp filter_by_difficulty([%StudyTask{difficulty: difficulty} = task | tail], difficulty, acc) do
    filter_by_difficulty(tail, difficulty, [task | acc])
  end

  defp filter_by_difficulty([_head | tail], difficulty, acc) do
    filter_by_difficulty(tail, difficulty, acc)
  end

  defp reverse(items), do: reverse(items, [])
  defp reverse([], acc), do: acc
  defp reverse([head | tail], acc), do: reverse(tail, [head | acc])

  defp completion_rate(0, _completed), do: 0.0
  defp completion_rate(total, completed), do: Float.round(completed / total * 100, 2)
end
