defmodule StudyMixProject.StudyTask do
  @enforce_keys [:title, :difficulty]
  defstruct [:title, :difficulty, completed: false]
end
