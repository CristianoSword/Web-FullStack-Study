base = Path.expand("../lib/pattern_matching_basics", __DIR__)

Code.require_file(Path.join(base, "match_payload.ex"))
Code.require_file(Path.join(base, "match_result.ex"))
Code.require_file(Path.join(base, "payload_builder.ex"))
Code.require_file(Path.join(base, "matcher.ex"))

alias PatternMatchingBasics.Matcher
alias PatternMatchingBasics.PayloadBuilder

scenarios = %{
  "greeting" => PayloadBuilder.build!(:tuple, {:greet, "Ana", "pt-BR"}),
  "point" => PayloadBuilder.build!(:tuple, {:point, 12, 45}),
  "list" => PayloadBuilder.build!(:list, ["keyboard", "monitor", "hub"]),
  "admin" => PayloadBuilder.build!(:map, %{role: :admin, name: "Carla", active: true}),
  "event" => PayloadBuilder.build!(:map, %{type: "event", payload: %{"source" => "cli", "kind" => "sync"}}),
  "command" => PayloadBuilder.build!(:binary, "cmd:reindex")
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
