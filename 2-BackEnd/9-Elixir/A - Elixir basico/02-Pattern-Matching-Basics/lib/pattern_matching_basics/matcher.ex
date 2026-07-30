defmodule PatternMatchingBasics.Matcher do
  alias PatternMatchingBasics.MatchPayload
  alias PatternMatchingBasics.MatchResult

  def analyze(%MatchPayload{kind: :tuple, value: {:greet, name, language}}) do
    %MatchResult{
      label: :tuple_greeting,
      details: "Greeting tuple matched for #{name} in #{language}",
      captures: %{name: name, language: language}
    }
  end

  def analyze(%MatchPayload{kind: :tuple, value: {:point, x, y}}) do
    %MatchResult{
      label: :tuple_point,
      details: "Point tuple matched at coordinates (#{x}, #{y})",
      captures: %{x: x, y: y}
    }
  end

  def analyze(%MatchPayload{kind: :list, value: [head | tail]}) do
    %MatchResult{
      label: :list_head_tail,
      details: "List matched with head #{inspect(head)} and #{length(tail)} tail items",
      captures: %{head: head, tail: tail}
    }
  end

  def analyze(%MatchPayload{kind: :map, value: %{role: :admin, name: name} = user}) do
    %MatchResult{
      label: :map_admin_user,
      details: "Admin user matched for #{name}",
      captures: %{name: name, user: user}
    }
  end

  def analyze(%MatchPayload{kind: :map, value: %{type: "event", payload: payload}}) do
    %MatchResult{
      label: :map_event,
      details: "Event map matched with payload keys #{payload |> Map.keys() |> Enum.join(", ")}",
      captures: %{payload: payload}
    }
  end

  def analyze(%MatchPayload{kind: :binary, value: <<"cmd:", command::binary>>}) do
    %MatchResult{
      label: :binary_command,
      details: "Binary command matched for #{command}",
      captures: %{command: command}
    }
  end

  def analyze(%MatchPayload{kind: kind, value: value}) do
    %MatchResult{
      label: :fallback,
      details: "No specialized pattern matched for #{kind}",
      captures: %{value: value}
    }
  end
end
