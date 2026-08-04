defmodule StudyMixProject.Validator do
  alias StudyMixProject.StudyTask

  @allowed_difficulties [:easy, :medium, :hard]

  def validate_title(title) when is_binary(title) do
    if String.trim(title) == "" do
      {:error, :empty_title}
    else
      :ok
    end
  end

  def validate_title(_title), do: {:error, :invalid_title}

  def validate_difficulty(difficulty) when difficulty in @allowed_difficulties, do: :ok
  def validate_difficulty(_difficulty), do: {:error, :invalid_difficulty}

  def validate_completion_target(tasks, title) do
    if Enum.any?(tasks, &matches_title?(&1, title)) do
      :ok
    else
      {:error, :task_not_found}
    end
  end

  defp matches_title?(%StudyTask{title: current_title}, expected_title) do
    current_title == expected_title
  end
end
