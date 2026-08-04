defmodule StudyMixProject.MixProject do
  use Mix.Project

  def project do
    [
      app: :study_mix_project,
      version: "0.1.0",
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
      deps: []
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {StudyMixProject.Application, []}
    ]
  end
end
