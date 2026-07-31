base = Path.expand("../lib/pattern_matching_basics", __DIR__)

Code.require_file(Path.join(base, "match_payload.ex"))
Code.require_file(Path.join(base, "match_result.ex"))
Code.require_file(Path.join(base, "matcher.ex"))

alias PatternMatchingBasics.MatchPayload
alias PatternMatchingBasics.Matcher

scenarios = %{
  "greeting" => %MatchPayload{kind: :tuple, value: {:greet, "Ana", "pt-BR"}},
  "point" => %MatchPayload{kind: :tuple, value: {:point, 12, 45}},
  "list" => %MatchPayload{kind: :list, value: ["keyboard", "monitor", "hub"]},
  "admin" => %MatchPayload{kind: :map, value: %{role: :admin, name: "Carla", active: true}},
  "event" => %MatchPayload{kind: :map, value: %{type: "event", payload: %{"source" => "cli", "kind" => "sync"}}},
  "command" => %MatchPayload{kind: :binary, value: "cmd:reindex"}
}

scenario_key =
  case System.argv() do
    [key] -> key
    _ -> "greeting"
  end

payload =
  Map.get_lazy(scenarios, scenario_key, fn ->
    raise """
    Unknown scenario #{inspect(scenario_key)}.
    Available scenarios: #{Enum.join(Map.keys(scenarios), ", ")}
    """
  end)

result = Matcher.analyze(payload)

IO.inspect(result, label: "pattern_match_result")
