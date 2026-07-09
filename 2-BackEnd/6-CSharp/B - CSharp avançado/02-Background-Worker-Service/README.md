# 02-Background-Worker-Service

Worker Service em C# para execucao de jobs agendados com cron, handlers pluggaveis, historico em memoria e comandos operacionais via CLI.

## O que o projeto cobre

- projeto `Microsoft.NET.Sdk.Worker` real
- configuracao de jobs em `appsettings.json`
- parsing de cron com `Cronos`
- handlers concretos para limpeza e sincronizacao
- historico de execucao, execucao manual e polling de jobs pendentes
- validacao de cron, nomes duplicados, handlers e intervalo de polling

## Estrutura

```text
02-Background-Worker-Service/
|-- Cli/
|-- Configuration/
|-- Contracts/
|-- Exceptions/
|-- Handlers/
|-- Models/
|-- Properties/
|-- Services/
|-- Validation/
|-- Workers/
|-- Program.cs
|-- BackgroundWorkerService.csproj
`-- appsettings.json
```

## Como usar

Quando houver .NET SDK instalado:

```bash
dotnet run
```

Comandos de operacao:

- `dotnet run -- --list-jobs`
- `dotnet run -- --history`
- `dotnet run -- --run-job cleanup-temp-files`
- `dotnet run -- --run-pending-once`

## Observacao

O host atual nao possui .NET SDK instalado, entao a validacao desta entrega foi feita por revisao estatica da estrutura, das referencias e da coerencia do fluxo do worker.
